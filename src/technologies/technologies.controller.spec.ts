import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesController } from './technologies.controller';
import {
  CreateTechnologiesService,
  RemoveTechnologiesService,
  RetrieveTechnologiesService,
} from './services';

describe('TechnologiesController', () => {
  let controller: TechnologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesController],
      providers: [
        CreateTechnologiesService,
        RemoveTechnologiesService,
        RetrieveTechnologiesService,
      ],
    }).compile();

    controller = module.get<TechnologiesController>(TechnologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
