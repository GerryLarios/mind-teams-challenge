import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import {
  ProfileEntity,
  TechnologyEntity,
  UserEntity,
  UserProfileTechnologyEntity,
} from 'src/entities';
import { CreateProfileDto } from '../dto';

@Injectable()
export default class CreateProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private repository: Repository<ProfileEntity>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    return this.repository.manager.transaction(async (manager) => {
      const user = await this.getUser(manager, userId);
      if (user.profile.technologies.length > 0) {
        await manager
          .getRepository(UserProfileTechnologyEntity)
          .remove(user.profile.technologies);
      }

      const technologies = await manager
        .getRepository(UserProfileTechnologyEntity)
        .save(
          await this.getUserProfileTechnologies(
            manager,
            createProfileDto.technologies,
          ),
        );

      const profile = await manager.getRepository(ProfileEntity).save(
        manager.getRepository(ProfileEntity).create({
          lenguageLevel: createProfileDto.lenguageLevel,
          resume: createProfileDto.resume,
          technologies,
        }),
      );

      user.profile = profile;

      return manager.getRepository(UserEntity).save(user);
    });
  }

  private getUser(manager: EntityManager, id: string) {
    return manager.getRepository(UserEntity).findOne({
      where: { id },
      relations: { profile: { technologies: true } },
    });
  }

  private async getUserProfileTechnologies(
    manager: EntityManager,
    newProfileTechnologies: CreateProfileDto['technologies'],
  ) {
    const technologies = await manager
      .getRepository(TechnologyEntity)
      .findBy({ id: In(newProfileTechnologies.map((t) => t.id)) });

    return technologies.map((t) =>
      manager.getRepository(UserProfileTechnologyEntity).create({
        technology: t,
        years: newProfileTechnologies.find(
          (newProfileTechnology) => newProfileTechnology.id === t.id,
        )?.years,
      }),
    );
  }
}
