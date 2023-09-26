import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  CreateOrderLogDto,
  UpdateOrderLogDto,
} from './dto/create-orderlog.dto';
import { ModelClass } from 'objection';
import OrderLog from 'src/db/models/OrderLog';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';
import Order from 'src/db/models/Order';

@Injectable()
export class OrderlogService {
  constructor(
    @Inject('OrderLog') private orderLog: ModelClass<OrderLog>,
    @Inject('Order') private orderModel: ModelClass<Order>,
  ) {}
  async create(createOrderLogDto: CreateOrderLogDto) {
    const order = await this.orderModel
      .query()
      .findById(createOrderLogDto.order_id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const brand = await this.orderLog.query().insert(createOrderLogDto);
    if (!brand) {
      throw new HttpException(
        'Order Log not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return HandleResponse.response(
      200,
      true,
      'Order Log created successfully',
      brand,
    );
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const brands = await this.orderLog
        .query()
        .where('is_deleted', false)
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(brands, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Order Log found',
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
    const brand = await this.orderLog
      .query()
      .where('is_deleted', false)
      .findById(id);
    if (!brand) {
      throw new HttpException('Order Log not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Order Log found',
      brand,
    );
  }

  async update(id: number, updateOrderLogDto: UpdateOrderLogDto) {
    const brand = await this.orderLog
      .query()
      .patchAndFetchById(id, updateOrderLogDto);
    if (!brand) {
      throw new HttpException('Order Log not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Order Log updated',
      brand,
    );
  }

  async remove(id: number) {
    const brand = await this.orderLog
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!brand) {
      throw new HttpException('Order Log not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Order Log deleted');
  }
}
