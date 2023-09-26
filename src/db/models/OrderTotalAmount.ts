// src/models/OrderTotalAmountHistory.ts
import { BaseModel } from './Base';

class OrderTotalAmountHistory extends BaseModel {
  static tableName = 'order_total_amount_historys';
  time: Date;
  order_id: number;
  total_amount: number;
}

export default OrderTotalAmountHistory;
