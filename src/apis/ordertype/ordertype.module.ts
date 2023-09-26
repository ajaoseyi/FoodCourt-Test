import { Module } from '@nestjs/common';
import { OrdertypeService } from './ordertype.service';
import { OrdertypeController } from './ordertype.controller';

@Module({
  controllers: [OrdertypeController],
  providers: [OrdertypeService],
})
export class OrdertypeModule {}
