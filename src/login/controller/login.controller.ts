import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('login')
@Controller('login')
export class LoginController {
  @Get()
  login(@Query('email') email: string, @Query('password') password: string) {
      return{
          message:'logged',
          email,
          token:'kjagdkjhaskgdhjsdasgdkdsf'
      }
  }
}
