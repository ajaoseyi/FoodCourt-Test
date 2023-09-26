import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import { Model } from 'objection';
import * as knexConfig from './knex';
import Knex from 'knex';
import { UserModel } from './models/User';
import { BrandModel } from './models/Brand';
import Admin from './models/Admin';
import OrderLog from './models/OrderLog';
import CalculatedOrder from './models/CalculatedOrder';
import Meal from './models/Meal';
import Order from './models/Order';
import OrderType from './models/OrderType';
import { AddonModel } from './models/Addon';
import LogRequest from './models/LogRequest';
import OrderTotalAmountHistory from './models/OrderTotalAmount';

const models = [
  AddonModel,
  BrandModel,
  Admin,
  CalculatedOrder,
  Meal,
  Order,
  OrderLog,
  OrderType,
  UserModel,
  LogRequest,
  UserModel,
  Admin,
  OrderTotalAmountHistory,
];

const modelProvider = map(models, (model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProvider,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = await Knex(knexConfig);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
