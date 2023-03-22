import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities';
import { ValidatePasswordService } from 'src/password/services';

@Injectable()
export default class ChangePasswordUserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @Inject(ValidatePasswordService)
    private validatePasswordService: ValidatePasswordService,
  ) {}

  async update(
    id: string,
    newHashedPassword: string,
    currentPassword: string | null,
  ) {
    const user = await this.repository.findOneBy({ id });
    const matched = await this.validatePasswordService.validate(
      currentPassword,
      user.password,
    );

    user.password = newHashedPassword;
    if (matched) {
      user.password = newHashedPassword;
    }

    return this.repository.save(user);
  }
}
