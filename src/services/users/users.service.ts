import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUsersDto, UpdateUsersDto } from '../../dtos/users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private countId = 0;
  findAll() {
    return this.users;
  }
  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  createUser(payload: CreateUsersDto) {
    const id = this.countId + 1;
    this.countId = id;
    return this.users.push({ id: id.toString(), ...payload });
  }
  updateUser(id: string, payload: UpdateUsersDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return (this.users[index] = { ...this.users[index], ...payload });
  }
  removeUser(id: string) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
