import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AccountEntity } from 'src/entities';
import { AccountsController } from './accounts.controller';
import {
  CreateAccountService,
  DeactivateAccountService,
  FindAccountService,
  RetrieveAccountService,
  UpdateAccountService,
} from './services';

@Module({
  controllers: [AccountsController],
  imports: [TypeOrmModule.forFeature([AccountEntity]), AuthModule],
  providers: [
    CreateAccountService,
    DeactivateAccountService,
    FindAccountService,
    RetrieveAccountService,
    UpdateAccountService,
  ],
})
export class AccountsModule {}
