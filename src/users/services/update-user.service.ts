import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto';
import { UserEntity } from 'src/entities';

@Injectable()
export default class UpdateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update({ id }, updateUserDto);
  }
}
