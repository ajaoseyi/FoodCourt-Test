import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import { Model } from 'objection';
import * as knexConfig from './knex';
import Knex from 'knex';
import Meal from './models/Meal';

const models = [Meal];

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
