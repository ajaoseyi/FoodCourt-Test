import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  CreateCalculatedOrderDto,
  UpdateCalculatedOrderDto,
} from './dto/create-calculatedorder.dto';
import CalculatedOrder from 'src/db/models/CalculatedOrder';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';
import { UserModel } from 'src/db/models/User';
import OrderType from 'src/db/models/OrderType';
import Meal from 'src/db/models/Meal';
import { AddonModel } from 'src/db/models/Addon';
import Order from 'src/db/models/Order';
import OrderLog from 'src/db/models/OrderLog';
import OrderTotalAmountHistory from 'src/db/models/OrderTotalAmount';

@Injectable()
export class CalculatedorderService {
  constructor(
    @Inject('CalculatedOrder')
    private calculatedOrderModel: ModelClass<CalculatedOrder>,
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
    @Inject('OrderType') private orderType: ModelClass<OrderType>,
    @Inject('Meal') private mealModel: ModelClass<Meal>,
    @Inject('AddonModel') private addonModel: ModelClass<AddonModel>,
    @Inject('Order') private orderModel: ModelClass<Order>,
    @Inject('OrderLog') private orderLog: ModelClass<OrderLog>,
    @Inject('OrderTotalAmountHistory')
    private orderTotalAmountHistory: ModelClass<OrderTotalAmountHistory>,
  ) {}
  async create(createCalculatedOrderDto: CreateCalculatedOrderDto) {
    let mealAmount = 0;

    // Check if createCalculatedOrderDto.user_id exists on user model
    const user = await this.userModel
      .query()
      .findById(createCalculatedOrderDto.user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if createCalculatedOrderDto.order_type_id exists on order_type model
    const orderType = await this.orderType
      .query()
      .findById(createCalculatedOrderDto.order_type_id);
    if (!orderType) {
      throw new HttpException('Order Type not found', HttpStatus.NOT_FOUND);
    }

    // Loop through createCalculatedOrderDto.meals
    // Check if createCalculatedOrderDto.meals.meal_id exists on meal model
    for (const meal of createCalculatedOrderDto.meals) {
      const mealExist = await this.mealModel.query().findById(meal.id);
      if (!mealExist) {
        throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
      }

      // Calculate mealAmount
      mealAmount += parseInt(meal.amount) * meal.quantity;

      // Loop through addons and check if addons exist on meal model
      for (const addon of meal.addons) {
        const addonExist = await this.addonModel.query().findById(addon.id);
        if (!addonExist) {
          throw new HttpException('Addon not found', HttpStatus.NOT_FOUND);
        }

        // Sum up addon amount
        mealAmount += addon.amount;
      }
    }

    const order_type_id = createCalculatedOrderDto.order_type_id;
    delete createCalculatedOrderDto.order_type_id;

    // Convert createCalculatedOrderDto.meals array to a string to save it in the database
    const mealsToString = JSON.stringify(createCalculatedOrderDto.meals);

    // Insert the calculated order into the database
    const requestStatus = await this.calculatedOrderModel.query().insert({
      ...createCalculatedOrderDto,
      total_amount: mealAmount,
      meals: mealsToString,
    });

    if (!requestStatus) {
      throw new HttpException(
        'Calculated Order not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Generate an order code
    const orderCode = Math.floor(100000 + Math.random() * 900000);

    // Insert into the order table
    const order = await this.orderModel.query().insert({
      user_id: createCalculatedOrderDto.user_id,
      order_type_id: order_type_id,
      order_code: 'ORDER-' + orderCode,
      paid: true,
      calculated_order_id: requestStatus.id,
    });

    // Insert into the order log table
    await this.orderLog.query().insert({
      order_id: order.id,
      description: 'Order received in kitchen',
      time: new Date().toISOString(),
    });

    // Insert into the orderTotalAmountHistory table
    await this.orderTotalAmountHistory.query().insert({
      order_id: order.id,
      total_amount: mealAmount,
      time: new Date(),
    });

    return HandleResponse.response(
      200,
      true,
      'Calculated Order created successfully',
    );
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const requestStatus = await this.calculatedOrderModel
        .query()
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(requestStatus, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Calculated Order  found',
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
    const requestStatus = await this.calculatedOrderModel.query().findById(id);
    if (!requestStatus) {
      return HandleResponse.response(
        HttpStatus.NOT_FOUND,
        false,
        'Calculated Order  not found',
      );
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Calculated Order  found',
      requestStatus,
    );
  }

  async update(id: number, updateCalculatedOrderDto: UpdateCalculatedOrderDto) {
    let mealAmount = 0;
    const calculatedOrder = await this.calculatedOrderModel
      .query()
      .findById(id);
    if (!calculatedOrder) {
      throw new HttpException(
        'Calculated Order not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userModel
      .query()
      .findById(updateCalculatedOrderDto.user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    for (const meal of updateCalculatedOrderDto.meals) {
      const mealExist = await this.mealModel.query().findById(meal.id);
      if (!mealExist) {
        throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
      }

      // Calculate mealAmount
      mealAmount += parseInt(meal.amount) * meal.quantity;

      // Loop through addons and check if addons exist on the meal model
      for (const addon of meal.addons) {
        const addonExist = await this.addonModel.query().findById(addon.id);
        if (!addonExist) {
          throw new HttpException('Addon not found', HttpStatus.NOT_FOUND);
        }
        // Sum up addon amount
        mealAmount += addon.amount;
      }
    }

    const mealsToString = JSON.stringify(updateCalculatedOrderDto.meals);

    // Update calculatedOrderModel with the new data
    await this.calculatedOrderModel.query().patchAndFetchById(id, {
      ...updateCalculatedOrderDto,
      total_amount: mealAmount,
      meals: mealsToString,
    });

    // Select order_id from the order table where calculated_order_id = id
    const order = await this.orderModel
      .query()
      .select('id')
      .where('calculated_order_id', id)
      .first();

    // Update order log table
    await this.orderLog.query().insert({
      order_id: order.id,
      description: 'Order edited in kitchen',
      time: new Date().toISOString(),
    });

    // Update orderTotalAmountHistory table with the new total_amount where order_id = order.id
    await this.orderTotalAmountHistory
      .query()
      .patch({ total_amount: mealAmount })
      .where('order_id', order.id);

    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Calculated Order Updated',
    );
  }

  async remove(id: number) {
    const requestStatus = await this.calculatedOrderModel
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!requestStatus) {
      throw new HttpException(
        'Calculated Order not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Calculated Order deleted',
    );
  }
}
