import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PasswordModule } from 'src/password/password.module';
import { UsersModule } from 'src/users/users.module';
import {
  SigninAuthService,
  SignupAuthService,
  ValidateTokenService,
} from './services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import Config from 'src/config';
import { JwtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    SigninAuthService,
    SignupAuthService,
    ValidateTokenService,
    JwtStrategy,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.register({
      secret: Config.getValues().jwt.secret,
      signOptions: {
        expiresIn: Config.getValues().jwt.expiresIn,
      },
    }),
    forwardRef(() => UsersModule),
    PasswordModule,
  ],
})
export class AuthModule {}
