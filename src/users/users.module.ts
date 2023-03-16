import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/entities';
import {
  CreateUserService,
  DeactivateUserService,
  FindUserService,
  RetrieveUsersService,
  UpdateUserService,
} from './services';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserService,
    DeactivateUserService,
    FindUserService,
    RetrieveUsersService,
    UpdateUserService,
  ],
})
export class UsersModule {}
