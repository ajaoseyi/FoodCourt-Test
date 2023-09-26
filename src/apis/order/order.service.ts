import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UpdateOrderDto } from './dto/create-order.dto';
import Order from 'src/db/models/Order';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';
import OrderLog from 'src/db/models/OrderLog';

@Injectable()
export class OrderService {
  constructor(
    @Inject('Order')
    private orderModel: ModelClass<Order>,
    @Inject('OrderLog') private orderLog: ModelClass<OrderLog>,
  ) {}

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const requestStatus = await this.orderModel
        .query()
        .where('is_hidden', false)
        .withGraphJoined('logs')
        .withGraphJoined('order_total_amount_history')
        .withGraphJoined('calculated_order')
        .withGraphJoined('order_type')
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(requestStatus, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Order found',
        pagination,
      );
    } catch (e) {
      Logger.error(e);
      return HandleResponse.response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        'Internal Server Error',
      );
    }
  }

  async findOne(id: number) {
    const requestStatus = await this.orderModel
      .query()
      .where('is_hidden', false)
      .withGraphJoined('logs')
      .withGraphJoined('order_total_amount_history')
      .withGraphJoined('calculated_order')
      .withGraphJoined('order_type')
      .findById(id);
    if (!requestStatus) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Order found',
      requestStatus,
    );
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const requestStatus = await this.orderModel.query().where('id', id).first();

    if (!requestStatus) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    console.log(requestStatus.order_code);
    const { kitchen_accepted, kitchen_prepared, kitchen_dispatched } =
      requestStatus;

    switch (updateOrderDto.status) {
      case 'accepted':
        if (requestStatus.kitchen_accepted) {
          throw new HttpException(
            'Order already accepted',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.updateOrderAndLog(
          id,
          'kitchen_accepted',
          'Order accepted in kitchen',
        );
        break;

      case 'prepared':
        if (!kitchen_accepted) {
          throw new HttpException(
            'Order cannot be prepared if not accepted',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (kitchen_prepared) {
          throw new HttpException(
            'Order already prepared',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.updateOrderAndLog(
          id,
          'kitchen_prepared',
          'Order prepared in kitchen',
        );
        break;

      case 'dispatched':
        if (!kitchen_accepted || !kitchen_prepared) {
          throw new HttpException(
            'Order cannot be dispatched if not prepared and accepted',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (kitchen_dispatched) {
          throw new HttpException(
            'Order already dispatched',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.updateOrderAndLog(
          id,
          'kitchen_dispatched',
          'Order dispatched in kitchen',
        );
        break;

      case 'completed':
        if (!kitchen_accepted || !kitchen_prepared || !kitchen_dispatched) {
          throw new HttpException(
            'Order cannot be completed if not dispatched, prepared, and accepted',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (requestStatus.completed) {
          throw new HttpException(
            'Order already completed',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.orderModel
          .query()
          .patch({ completed: true, completed_time: new Date() })
          .where('id', id);
        await this.orderLog.query().insert({
          order_id: id,
          description: 'Order completed in kitchen',
          time: new Date().toISOString(),
        });
        break;

      default:
        throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }

    return HandleResponse.response(HttpStatus.OK, true, 'Order updated');
  }

  private async updateOrderAndLog(
    id: number,
    fieldToUpdate: string,
    logDescription: string,
  ) {
    const updateObj = {
      [fieldToUpdate]: true,
      [`${fieldToUpdate}_time`]: new Date(),
    };
    await this.orderModel.query().patch(updateObj).where('id', id);
    await this.orderLog.query().insert({
      order_id: id,
      description: logDescription,
      time: new Date().toISOString(),
    });
  }

  async remove(id: number) {
    const requestStatus = await this.orderModel
      .query()
      .update({ is_hidden: true })
      .where({ id });
    if (!requestStatus) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Order deleted');
  }
}
