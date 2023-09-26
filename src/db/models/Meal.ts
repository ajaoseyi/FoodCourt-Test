// src/models/Meal.ts

import { Model } from 'objection';
import { BaseModel } from './Base';
import { AddonModel } from './Addon';
import { BrandModel } from './Brand';

class Meal extends BaseModel {
  static tableName = 'meals';

  id: number;
  name: string;
  brand_id: number;
  addons: any[];
  description: string;
  price: number;
  is_deleted: boolean;
  created_at: Date;

  static relationMappings = {
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: BrandModel,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: AddonModel,
      join: {
        from: 'meals.id',
        to: 'addons.meal_id',
      },
    },
  };
}

export default Meal;
