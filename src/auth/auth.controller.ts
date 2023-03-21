import { Controller, Post, Body } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { SigninAuthService, SignupAuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinService: SigninAuthService,
    private readonly signupService: SignupAuthService,
  ) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    this.signinService.signin(signinDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    this.signupService.signup(signupDto);
  }
}
