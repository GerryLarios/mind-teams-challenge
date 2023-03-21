import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities';

@Injectable()
export default class FindUserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      select: {
        active: true,
        createdAt: true,
        firstname: true,
        id: true,
        isAdmin: true,
        isSuperAdmin: true,
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
