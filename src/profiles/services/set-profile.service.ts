import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import {
  ProfileEntity,
  TechnologyEntity,
  UserEntity,
  UserProfileTechnologyEntity,
} from 'src/entities';
import { SetProfileDto } from '../dto';

@Injectable()
export default class SetProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private repository: Repository<ProfileEntity>,
  ) {}

  async set(userId: string, setProfileDto: SetProfileDto) {
    return this.repository.manager.transaction(async (manager) => {
      const user = await this.getUser(manager, userId);
      if (user?.profile?.technologies?.length > 0) {
        await manager
          .getRepository(UserProfileTechnologyEntity)
          .remove(user.profile.technologies);
      }

      const technologies = await manager
        .getRepository(UserProfileTechnologyEntity)
        .save(
          await this.getUserProfileTechnologies(
            manager,
            setProfileDto.technologies,
          ),
        );

      const profile = await manager.getRepository(ProfileEntity).save(
        manager.getRepository(ProfileEntity).create({
          lenguageLevel: setProfileDto.lenguageLevel,
          resume: setProfileDto.resume,
          technologies,
        }),
      );

      user.profile = profile;

      await manager.getRepository(UserEntity).save(user);
    });
  }

  private getUser(manager: EntityManager, id: string) {
    return manager.getRepository(UserEntity).findOne({
      relations: { profile: { technologies: true } },
      select: { profile: { technologies: true } },
      where: { id },
    });
  }

  private async getUserProfileTechnologies(
    manager: EntityManager,
    newProfileTechnologies: SetProfileDto['technologies'],
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
