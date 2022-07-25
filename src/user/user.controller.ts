import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('/stats-monthly')
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'User ID',
    required: false,
  })
  async getStatsByMonth(@Query('id') id?: string | null): Promise<any> {
    return await this.userService.getStatsByMonth(id);
  }

  @Get('/stats')
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'User ID',
    required: false,
  })
  async getTotalPoints(@Query('id') id?: string | null): Promise<any> {
    return await this.userService.getTotalPoints(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | User[]> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return await this.userService.remove(+id);
  }
}
