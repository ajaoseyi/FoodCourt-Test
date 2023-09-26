import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedorderService } from './calculatedorder.service';

describe('CalculatedorderService', () => {
  let service: CalculatedorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatedorderService],
    }).compile();

    service = module.get<CalculatedorderService>(CalculatedorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
