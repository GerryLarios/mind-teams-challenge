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
      select: {
        active: true,
        createdAt: true,
        firstname: true,
        id: true,
        isAdmin: true,
        lastname: true,
        updatedAt: true,
      },
      order: {
        active: 'ASC',
        createdAt: 'ASC',
      },
      relations: {
        profile: {
          technologies: true,
        },
      },
    });
  }
}
