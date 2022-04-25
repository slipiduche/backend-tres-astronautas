import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from 'src/users/services/users.service';
import { MongoIdPipe } from '../../common/mongoid.pipe';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/models/roles.model';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @Public()
  async getUsers() {
    return await this.usersService.findAll();
  }
  @Get(':userId')
  @Public()
  async getUser(@Param('userId', MongoIdPipe) userId: string) {
    return await this.usersService.findOne(userId);
  }
  @Post()
  @Public()
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
  @Roles(Role.ADMIN)
  @Delete(':userId')
  async deleteUser(@Param('userId', MongoIdPipe) userId: string) {
    return await this.usersService.removeUser(userId);
  }
}
