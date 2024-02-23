import { Inject, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ModelClass } from 'objection';
import MealModel from 'src/db/models/Meal';

@Injectable()
export class MealService {
  constructor(
    @Inject('MealModel') private readonly mealModel: ModelClass<MealModel>,
  ) {}
  async create(createMealDto: CreateMealDto) {
    const meal = await this.mealModel.query().insert(createMealDto);
    return meal;
  }

  async findAll() {
    const meals = await this.mealModel.query();
    return meals;
  }

  async findOne(id: number) {
    const meal = await this.mealModel.query().findById(id);
    return meal;
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    const meal = await this.mealModel
      .query()
      .patchAndFetchById(id, updateMealDto);
    return meal;
  }

  async remove(id: number) {
    await this.mealModel.query().deleteById(id);
    return { data: undefined, message: 'Meal deleted successfully' };
  }
}
