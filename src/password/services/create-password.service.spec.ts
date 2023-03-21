import { Test, TestingModule } from '@nestjs/testing';
import CreatePasswordService from './create-password.service';

describe('CreatePasswordService', () => {
  let service: CreatePasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePasswordService],
    }).compile();

    service = module.get<CreatePasswordService>(CreatePasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
