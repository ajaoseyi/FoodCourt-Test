import { BaseModel } from './Base';

export class AddonModel extends BaseModel {
  static tableName = 'addons';
  meal_data: object;
  meal_id: number;
  amount: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
