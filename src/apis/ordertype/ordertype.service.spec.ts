import { Test, TestingModule } from '@nestjs/testing';
import { OrdertypeService } from './ordertype.service';

describe('OrdertypeService', () => {
  let service: OrdertypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdertypeService],
    }).compile();

    service = module.get<OrdertypeService>(OrdertypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
