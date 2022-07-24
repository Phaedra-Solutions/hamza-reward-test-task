import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Users } from 'src/common/models';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await Users.create({ ...createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await Users.findAll({});
  }

  async findOne(id: number): Promise<User> {
    return await Users.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [_, affectedRows] = await Users.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return affectedRows[0].get({ plain: true });
  }

  async remove(id: number): Promise<number> {
    return await Users.destroy({ where: { id } });
  }
}
