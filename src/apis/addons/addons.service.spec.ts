import { Test, TestingModule } from '@nestjs/testing';
import { AddonsService } from './addons.service';
import { AddonsModule } from './addons.module';

describe('AddonsService', () => {
  let service: AddonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AddonsModule],
      providers: [AddonsService],
    }).compile();

    service = module.get<AddonsService>(AddonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
