import { ApiProperty } from '@nestjs/swagger';
/**
 * Transaction entity
 * @export
 * @class TransactionEntity
 * @Description This class is used to represent the transaction entity
 */
export class Transaction {
  id: string;
  @ApiProperty({ description: 'Id of the user who made the transaction' })
  user_id: string;
  @ApiProperty({ description: 'Transaction amount' })
  amount: number;
}
