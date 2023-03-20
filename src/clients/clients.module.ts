import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/entities';
import { ClientsController } from './clients.controller';
import {
  CreateClientService,
  DeactivateClientService,
  FindClientService,
  RetrieveClientsService,
  UpdateClientService,
} from './services';

@Module({
  controllers: [ClientsController],
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [
    CreateClientService,
    DeactivateClientService,
    FindClientService,
    RetrieveClientsService,
    UpdateClientService,
  ],
})
export class ClientsModule {}
