// src/models/Meal.ts

import { BaseModel } from './Base';

class MealModel extends BaseModel {
  static tableName = 'meals';
  id: number;
  name: string;
  brand_id: number;
  addons: any[];
  description: string;
  price: number;
}

export default MealModel;
