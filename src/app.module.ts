import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, ProductsModule, LoginModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
