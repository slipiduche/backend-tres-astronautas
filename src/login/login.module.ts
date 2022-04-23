import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';

@Module({
  controllers: [LoginController],
  providers: [],
})
export class LoginModule {}
