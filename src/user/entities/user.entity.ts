import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: string;
  @ApiProperty({ description: 'Name of the user' })
  name: string;
}
