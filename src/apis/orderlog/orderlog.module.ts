import { Module } from '@nestjs/common';
import { OrderlogService } from './orderlog.service';
import { OrderlogController } from './orderlog.controller';

@Module({
  controllers: [OrderlogController],
  providers: [OrderlogService],
})
export class OrderlogModule {}
