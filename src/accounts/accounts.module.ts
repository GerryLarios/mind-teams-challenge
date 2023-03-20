import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities';
import { AccountsController } from './accounts.controller';
import {
  CreateAccountService,
  FindAccountService,
  RetrieveAccountService,
} from './services';

@Module({
  controllers: [AccountsController],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [CreateAccountService, FindAccountService, RetrieveAccountService],
})
export class AccountsModule {}
