import {
  Injectable,
  Inject,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll() {
    const users = await this.getAllUsers();

    return users.map((user) => ({
      name: user.name,
      email: user.email,
      id: user._id,
    }));
  }
  async findOne(id: string) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const userWoP = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    return userWoP;
  }
  async createUser(payload: CreateUsersDto) {
    //const exist = await this.userModel.where('email === payload.email');
    const newUser = await new this.userModel(payload);
    await newUser.save();
    console.log(newUser);
    if (!newUser) {
      throw new Error('Not created');
    }
    return {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    };
  }
  async updateUser(id: string, payload: UpdateUsersDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    user.save();
    return {
      name: user.name,
      email: user.email,
      id: user._id,
    };
  }
  async removeUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    console.log(users);
    return users;
  }
  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
