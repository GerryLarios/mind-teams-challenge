import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import {
  CreateClientService,
  DeactivateClientService,
  FindClientService,
  RetrieveClientsService,
  UpdateClientService,
} from './services';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        CreateClientService,
        DeactivateClientService,
        FindClientService,
        RetrieveClientsService,
        UpdateClientService,
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
