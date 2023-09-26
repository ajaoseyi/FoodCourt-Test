import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAddonDto, UpdateAddonDto } from './dto/create-addon.dto';
import { AddonModel } from 'src/db/models/Addon';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';
import Meal from 'src/db/models/Meal';

@Injectable()
export class AddonsService {
  constructor(
    @Inject('AddonModel') private addonModel: ModelClass<AddonModel>,
    @Inject('Meal') private mealModel: ModelClass<Meal>,
  ) {}
  async create(createAddonDto: CreateAddonDto) {
    // Check if meal id exists
    const mealId = await this.mealModel
      .query()
      .findById(createAddonDto.meal_id);
    if (!mealId) {
      throw new HttpException('Meal id does not exist', HttpStatus.BAD_REQUEST);
    }

    const requestStatus = await this.addonModel.query().insert(createAddonDto);
    if (!requestStatus) {
      throw new HttpException(
        'Unable to create addons',
        HttpStatus.BAD_REQUEST,
      );
    }

    return HandleResponse.response(
      HttpStatus.CREATED,
      true,
      'Addons created successfully',
      requestStatus,
    );
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const requestStatus = await this.addonModel
        .query()
        .where('is_deleted', false)
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(requestStatus, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Addons found',
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
    const requestStatus = await this.addonModel.query().findById(id);
    if (!requestStatus) {
      throw new HttpException('Addons not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(
      HttpStatus.OK,
      true,
      'Addons found',
      requestStatus,
    );
  }

  async update(id: number, updateAddonDto: UpdateAddonDto) {
    const requestStatus = await this.addonModel
      .query()
      .patchAndFetchById(id, updateAddonDto);
    if (!requestStatus) {
      throw new HttpException('Addons not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Addons updated');
  }

  async remove(id: number) {
    const requestStatus = await this.addonModel
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!requestStatus) {
      throw new HttpException('Addons not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Addons deleted');
  }
}
