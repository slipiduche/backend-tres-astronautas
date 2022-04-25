import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from 'src/users/services/users.service';
import { MongoIdPipe } from '../../common/mongoid.pipe';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }
  @Get(':userId')
  async getUser(@Param('userId', MongoIdPipe) userId: string) {
    return await this.usersService.findOne(userId);
  }
  @Post()
  async createUser(@Body() payload: CreateUsersDto) {
    const resp = await this.usersService.createUser(payload);
    return { message: 'user created', user: resp };
  }
  @Put(':userId')
  async updateUser(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUsersDto,
  ) {
    const { name, email, password } = payload;
    return await this.usersService.updateUser(userId, payload);
  }
  @Delete(':userId')
  async deleteUser(@Param('userId', MongoIdPipe) userId: string) {
    return await this.usersService.removeUser(userId);
  }
}
