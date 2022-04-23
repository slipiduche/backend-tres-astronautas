import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUsersDto, UpdateUsersDto } from '../../dtos/users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private countId = 0;
  findAll() {
    return this.users.map((user) => ({
      name: user.name,
      email: user.email,
      id: user.id,
    }));
  }
  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return {
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }
  createUser(payload: CreateUsersDto) {
    const user = this.users.find((item) => item.email === payload.email);
    if (user) {
      throw new NotAcceptableException(`${payload.email} already used`);
    }

    const id = this.countId + 1;
    this.countId = id;
    this.users.push({ id: id.toString(), ...payload });
    return {
      name: payload.name,
      email: payload.email,
      id: id.toString(),
    };
  }
  updateUser(id: string, payload: UpdateUsersDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users[index] = { ...this.users[index], ...payload };
    return {
      name: this.users[index].name,
      email: this.users[index].email,
      id: this.users[index].id,
    };
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
