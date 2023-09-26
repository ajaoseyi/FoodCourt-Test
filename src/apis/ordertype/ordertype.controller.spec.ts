import { Test, TestingModule } from '@nestjs/testing';
import { OrdertypeController } from './ordertype.controller';
import { OrdertypeService } from './ordertype.service';

describe('OrdertypeController', () => {
  let controller: OrdertypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdertypeController],
      providers: [OrdertypeService],
    }).compile();

    controller = module.get<OrdertypeController>(OrdertypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
