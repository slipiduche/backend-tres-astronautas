import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'users';
  }
  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return { user: userId };
  }
  @Post()
  createUser(@Body() payload: any) {
    const { name, email, password } = payload;
    return {
      message: 'user created',
      user: { email, name },
    };
  }
  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() payload: any) {
    const { name, email, password } = payload;
    return {
      message: `User ${userId} updated`,
      user: { email, name },
    };
  }
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return {
      message: `User ${userId} deleted`,
    };
  }
}
