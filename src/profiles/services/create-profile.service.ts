import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity, UserEntity } from 'src/entities';
import { CreateProfileDto } from '../dto';

@Injectable()
export default class CreateProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private repository: Repository<ProfileEntity>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    return this.repository.manager.transaction(async (manager) => {
      const user = await manager
        .getRepository(UserEntity)
        .findOneBy({ id: userId });

      const profile = await this.repository.save(
        manager.getRepository(ProfileEntity).create({
          resume: createProfileDto.resume,
          lenguageLevel: createProfileDto.lenguageLevel,
          technologies: createProfileDto.technologies.map((t) => ({
            id: t.id,
            years: t.years,
          })),
        }),
      );

      user.profile = profile;

      return manager.getRepository(UserEntity).save(user);
    });
  }
}
