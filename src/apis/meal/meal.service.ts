import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateMealDto, UpdateMealDto } from './dto/create-meal.dto';
import Meal from 'src/db/models/Meal';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';

@Injectable()
export class MealService {
  constructor(@Inject('Meal') private mealModel: ModelClass<Meal>) {}
  async create(createMealDto: CreateMealDto) {
    const requestStatus = await this.mealModel.query().insert(createMealDto);
    if (!requestStatus) {
      throw new HttpException(
        'Meal not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Meal created successfully',
      requestStatus,
    );
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const requestStatus = await this.mealModel
        .query()
        .where('meals.is_deleted', false)
        .withGraphJoined('addons')
        .withGraphJoined('brand')
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(requestStatus, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Meal found',
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
    const requestStatus = await this.mealModel
      .query()
      .withGraphJoined('addons')
      .withGraphJoined('brand')
      .findById(id);
    if (!requestStatus) {
      throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Meal found',
      requestStatus,
    );
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    const requestStatus = await this.mealModel
      .query()
      .patchAndFetchById(id, updateMealDto);
    if (!requestStatus) {
      throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Meal updated',
      requestStatus,
    );
  }

  async remove(id: number) {
    const requestStatus = await this.mealModel
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!requestStatus) {
      throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Meal deleted');
  }
}
