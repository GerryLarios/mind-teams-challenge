import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePasswordService } from 'src/password/services';
import {
  ChangePasswordUserService,
  ValidateUserService,
} from 'src/users/services';
import { SignupDto } from '../dto';

@Injectable()
export default class SignupAuthService {
  constructor(
    private readonly changeUserPasswordService: ChangePasswordUserService,
    private readonly createPasswordService: CreatePasswordService,
    private readonly validateUserService: ValidateUserService,
  ) {}

  async signup({ email, password }: SignupDto) {
    const user = await this.validateUserService.validate(email);
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    await this.changeUserPasswordService.update(
      user.id,
      await this.createPasswordService.create(password),
      user.password,
    );
  }
}
