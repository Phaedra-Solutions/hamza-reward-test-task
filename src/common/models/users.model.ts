import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { UUID, UUIDV4, STRING } from 'sequelize';
import Transactions from './transactions.model';

@Table({ tableName: 'users' })
class Users extends Model {
  @PrimaryKey
  @Column({ type: UUID, defaultValue: UUIDV4 })
  id: string;

  @Column({ type: STRING })
  name: string;

  @HasMany(() => Transactions)
  transactions: Transactions[];
}

export default Users;
