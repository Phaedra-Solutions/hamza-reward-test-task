import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transactions } from '../common/models/index';
import { Transaction as TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    const points =
      createTransactionDto.amount - 50 + (createTransactionDto.amount - 100);
    const createdTransaction = await Transactions.create({
      ...createTransactionDto,
      points,
    });
    const _transaction = await createdTransaction.get({ plain: true });
    return _transaction;
  }

  async findAll(): Promise<TransactionEntity[]> {
    return await Transactions.findAll();
  }

  async findOne(id: string): Promise<Transactions> {
    return await Transactions.findOne({ where: { id } });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const points = updateTransactionDto.amount
      ? updateTransactionDto.amount - 50 + (updateTransactionDto.amount - 100)
      : 0;
    const [_, affectedRows] = await Transactions.update(
      {
        ...updateTransactionDto,
        ...(updateTransactionDto.amount ? { points } : {}),
      },
      {
        where: { id },
        returning: true,
      },
    );
    return affectedRows[0].get({ plain: true });
  }

  async remove(id: string): Promise<number> {
    return await Transactions.destroy({ where: { id } });
  }
}
