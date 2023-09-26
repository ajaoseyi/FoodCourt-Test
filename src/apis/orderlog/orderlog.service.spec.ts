import { Test, TestingModule } from '@nestjs/testing';
import { OrderlogService } from './orderlog.service';

describe('OrderlogService', () => {
  let service: OrderlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderlogService],
    }).compile();

    service = module.get<OrderlogService>(OrderlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
