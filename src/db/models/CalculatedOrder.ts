// src/models/CalculatedOrder.ts
import { BaseModel } from './Base';

class CalculatedOrder extends BaseModel {
  static tableName = 'calculated_orders';

  total_amount?: number;
  free_delivery?: boolean;
  delivery_fee?: number;
  service_charge?: number;
  address_details?: object;
  meals?: string;
  user_id?: number;
  is_deleted?: boolean;
}

export default CalculatedOrder;
