import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AddonsModule } from './addons/addons.module';
import { OrderModule } from './order/order.module';
import { OrdertypeModule } from './ordertype/ordertype.module';
import { MealModule } from './meal/meal.module';
import { BrandModule } from './brand/brand.module';
import { OrderlogModule } from './orderlog/orderlog.module';
import { CalculatedorderModule } from './calculatedorder/calculatedorder.module';

@Module({
  imports: [
    UserModule,
    AddonsModule,
    OrderModule,
    OrdertypeModule,
    MealModule,
    BrandModule,
    OrderlogModule,
    CalculatedorderModule,
  ],
})
export class APIModule {}
