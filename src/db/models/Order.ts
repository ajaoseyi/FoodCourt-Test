// src/models/OrderType.ts
import { Model } from 'objection';
import { BaseModel } from './Base';
import CalculatedOrder from './CalculatedOrder';
import OrderLog from './OrderLog';
import OrderTotalAmountHistory from './OrderTotalAmount';
import OrderType from './OrderType';

class Order extends BaseModel {
  static tableName = 'orders';

  user_id: number;
  completed: boolean;
  cancelled: boolean;
  kitchen_cancelled: boolean;
  kitchen_accepted: boolean;
  kitchen_dispatched: boolean;
  kitchen_dispatched_time: Date | null;
  kitchen_accepted_time: Date | null;
  completed_time: Date | null;
  rider_id: number;
  kitchen_prepared: boolean;
  rider_assigned: boolean;
  paid: boolean;
  order_code: string;
  calculated_order_id: number;
  kitchen_verified_time: Date | null;
  kitchen_completed_time: Date | null;
  shop_accepted: boolean;
  shop_prepared: boolean;
  scheduled: boolean;
  confirmed_by_id: number | null;
  completed_by_id: number | null;
  order_type_id: number | null;
  is_hidden: boolean;

  $formatJson(json) {
    json = super.$formatJson(json);
    return json;
  }

  static relationMappings = {
    calculated_order: {
      relation: Model.BelongsToOneRelation,
      modelClass: CalculatedOrder,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    logs: {
      relation: Model.HasManyRelation,
      modelClass: OrderLog,
      join: {
        from: 'orders.id',
        to: 'order_logs.order_id',
      },
    },
    order_total_amount_history: {
      relation: Model.HasManyRelation,
      modelClass: OrderTotalAmountHistory,
      join: {
        from: 'orders.id',
        to: 'order_total_amount_historys.order_id',
      },
    },
    order_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderType,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id',
      },
    },
  };
}

export default Order;
