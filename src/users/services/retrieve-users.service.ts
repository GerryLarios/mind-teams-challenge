import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities';

@Injectable()
export default class RetrieveUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  retrieve() {
    return this.repository.find({
      select: [
        'id',
        'email',
        'firstname',
        'lastname',
        'isAdmin',
        'isSuperAdmin',
        'lastname',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
