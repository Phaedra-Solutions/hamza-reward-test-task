import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Users, Transactions } from '../common/models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await Users.create({ ...createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await Users.findAll({});
  }

  async findOne(id: string): Promise<User> {
    return await Users.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const [_, affectedRows] = await Users.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return affectedRows[0].get({ plain: true });
  }

  async remove(id: string): Promise<number> {
    return await Users.destroy({ where: { id } });
  }

  async getStatsByMonth(id: string | null): Promise<User | User[]> {
    return await Users.findAll({
      where: {
        ...(id ? { id } : {}),
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Transactions,
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('points')), 'points'],
            [
              Sequelize.fn(
                'date_trunc',
                'month',
                Sequelize.col('transactions.createdAt'),
              ),
              'month',
            ],
          ],
        },
      ],
      group: [
        'Users.id',
        'transactions.createdAt',
        'transactions.points',
        'transactions.id',
      ],
    });
  }

  async getTotalPoints(id: string | null): Promise<User[]> {
    return await Users.findAll({
      where: {
        ...(id ? { id } : {}),
      },
      attributes: [
        'id',
        'name',
        [Sequelize.fn('SUM', Sequelize.col('transactions.points')), 'points'],
      ],
      include: [
        {
          model: Transactions,
          attributes: [],
        },
      ],
      group: ['Users.id', 'transactions.id'],
    });
  }
}
