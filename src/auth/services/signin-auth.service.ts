import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidatePasswordService } from 'src/password/services';
import { ValidateUserService } from 'src/users/services';
import { SigninDto } from '../dto';

@Injectable()
export default class SigninAuthService {
  constructor(
    private readonly validatePasswordService: ValidatePasswordService,
    private readonly validateUserService: ValidateUserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SigninDto) {
    const user = await this.validateUserService.validate(email);
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isValid = await this.validatePasswordService.validate(
      password,
      user.password,
    );
    if (!isValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.jwtService.sign(user.id);
  }
}
