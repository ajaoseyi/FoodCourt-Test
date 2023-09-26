import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  CreateOrdertypeDto,
  UpdateOrderTypeDto,
} from './dto/create-ordertype.dto';
import OrderType from 'src/db/models/OrderType';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';

@Injectable()
export class OrdertypeService {
  constructor(@Inject('OrderType') private orderType: ModelClass<OrderType>) {}
  async create(createOrdertypeDto: CreateOrdertypeDto) {
    try {
      const requestStatus = await this.orderType
        .query()
        .insert(createOrdertypeDto);
      if (!requestStatus) {
        throw new HttpException(
          'Order Type not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return HandleResponse.response(
        200,
        true,
        'Order Type created successfully',
        requestStatus,
      );
    } catch (e) {
      Logger.error(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const requestStatus = await this.orderType
        .query()
        .where('is_deleted', false)
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(requestStatus, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Order Type found',
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
    const requestStatus = await this.orderType.query().findById(id);
    if (!requestStatus) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Order Type found',
      requestStatus,
    );
  }

  async update(id: number, updateOrderTypeDto: UpdateOrderTypeDto) {
    const requestStatus = await this.orderType
      .query()
      .patchAndFetchById(id, updateOrderTypeDto);
    if (!requestStatus) {
      throw new HttpException('Order Type not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Order Type updated',
      requestStatus,
    );
  }

  async remove(id: number) {
    const requestStatus = await this.orderType
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!requestStatus) {
      throw new HttpException('Order Type not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Order Type deleted');
  }
}
