import { Test, TestingModule } from '@nestjs/testing';
import { OrderlogController } from './orderlog.controller';
import { OrderlogService } from './orderlog.service';

describe('OrderlogController', () => {
  let controller: OrderlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderlogController],
      providers: [OrderlogService],
    }).compile();

    controller = module.get<OrderlogController>(OrderlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
