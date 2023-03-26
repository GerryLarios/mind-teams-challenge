import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { JwtAuthGuard } from './guards';
import { SigninAuthService, SignupAuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinService: SigninAuthService,
    private readonly signupService: SignupAuthService,
  ) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.signinService.signin(signinDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    this.signupService.signup(signupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findUserByToken(@Request() req) {
    return req?.user;
  }
}
