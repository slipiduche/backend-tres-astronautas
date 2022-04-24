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
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }
  @Post()
  createUser(@Body() payload: CreateUsersDto) {
    const resp = this.usersService.createUser(payload);
    return { message: 'user created', user: resp };
  }
  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() payload: UpdateUsersDto) {
    const { name, email, password } = payload;
    return this.usersService.updateUser(userId, payload);
  }
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.removeUser(userId);
  }
}
