import { Module } from '@nestjs/common';
import { CalculatedorderService } from './calculatedorder.service';
import { CalculatedorderController } from './calculatedorder.controller';

@Module({
  controllers: [CalculatedorderController],
  providers: [CalculatedorderService],
})
export class CalculatedorderModule {}
