import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedorderController } from './calculatedorder.controller';
import { CalculatedorderService } from './calculatedorder.service';

describe('CalculatedorderController', () => {
  let controller: CalculatedorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatedorderController],
      providers: [CalculatedorderService],
    }).compile();

    controller = module.get<CalculatedorderController>(
      CalculatedorderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
