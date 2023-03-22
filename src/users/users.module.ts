import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/entities';
import {
  ChangePasswordUserService,
  CreateUserService,
  DeactivateUserService,
  FindUserService,
  RetrieveUsersService,
  UpdateUserService,
  ValidateUserService,
} from './services';
import { PasswordModule } from 'src/password/password.module';

@Module({
  controllers: [UsersController],
  exports: [ChangePasswordUserService, FindUserService, ValidateUserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), PasswordModule],
  providers: [
    ChangePasswordUserService,
    CreateUserService,
    DeactivateUserService,
    FindUserService,
    RetrieveUsersService,
    UpdateUserService,
    ValidateUserService,
  ],
})
export class UsersModule {}
