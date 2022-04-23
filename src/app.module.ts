import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { LoginController } from './controllers/login/login.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController, LoginController],
  providers: [AppService],
})
export class AppModule {}
