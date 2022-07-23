import { INTEGER, UUID, UUIDV4 } from 'sequelize';
import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Users from './users.model';

@Table({ tableName: 'transactions' })
class Transactions extends Model {
  @PrimaryKey
  @Column({ type: UUID, defaultValue: UUIDV4 })
  id: string;

  @ForeignKey(() => Users)
  @Column({ type: UUID })
  user_id: string;

  @Column({ type: INTEGER })
  amount: number;
}

export default Transactions;
