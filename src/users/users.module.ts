import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { OwnerController } from './controllers/owner/owner.controller';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/services/products.service';
import { OwnerService } from './services/owner/owner.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [UsersController, OwnerController],
  providers: [UsersService, OwnerService],
  exports: [UsersService],
})
export class UsersModule {}
