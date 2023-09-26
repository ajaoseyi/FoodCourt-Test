// src/models/OrderLog.ts
import { BaseModel } from './Base';

class OrderLog extends BaseModel {
  static tableName = 'order_logs';

  order_id: number;
  description: string;
  time: string;
  is_deleted: boolean;
}

export default OrderLog;
