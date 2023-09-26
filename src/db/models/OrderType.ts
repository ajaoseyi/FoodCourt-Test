// src/models/OrderType.ts
import { BaseModel } from './Base';

class OrderType extends BaseModel {
  static tableName = 'order_types';
  name: string;
  is_deleted: boolean;
}

export default OrderType;
