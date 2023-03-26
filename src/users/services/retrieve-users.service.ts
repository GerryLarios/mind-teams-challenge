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
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        isAdmin: true,
        isSuperAdmin: true,
        active: true,
        updatedAt: true,
        createdAt: true,
      },
      order: {
        active: 'ASC',
        createdAt: 'ASC',
      },
      relations: {
        profile: {
          technologies: { technology: true },
        },
      },
    });
  }
}
