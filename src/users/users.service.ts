import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import User from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repository.create({
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
    });

    return this.repository.save(user);
  }

  async findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id, active: true } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update({ id }, { ...updateUserDto });
  }

  remove(id: string) {
    return this.repository.update({ id }, { active: false });
  }
}
