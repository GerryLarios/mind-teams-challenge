import { Test, TestingModule } from '@nestjs/testing';
import ValidatePasswordService from './validate-password.service';

describe('ValidatePasswordService', () => {
  let service: ValidatePasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatePasswordService],
    }).compile();

    service = module.get<ValidatePasswordService>(ValidatePasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
