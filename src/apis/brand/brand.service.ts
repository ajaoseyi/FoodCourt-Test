import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';
import { BrandModel } from 'src/db/models/Brand';
import { ModelClass } from 'objection';
import calculatePagination from '../../shared/Pagination/pagination';
import HandleResponse from '../../shared/Response/HandleResponse';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandModel') private brandModel: ModelClass<BrandModel>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const nameExists = await this.brandModel
      .query()
      .findOne({ name: createBrandDto.name });
    if (nameExists) {
      throw new HttpException(
        'Brand name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const brand = await this.brandModel.query().insert(createBrandDto);
    if (!brand) {
      throw new HttpException('Brand not created', HttpStatus.BAD_REQUEST);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Brand created', brand);
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const brands = await this.brandModel
        .query()
        .where('is_deleted', false)
        .offset(offset)
        .limit(limit);

      const pagination = calculatePagination(brands, page, limit);
      return HandleResponse.response(
        HttpStatus.OK,
        true,
        'Brand found',
        pagination,
      );
    } catch (e) {
      Logger.error(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const brand = await this.brandModel.query().findById(id);
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Brand found', brand);
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel
      .query()
      .patchAndFetchById(id, updateBrandDto);
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return HandleResponse.response(HttpStatus.OK, true, 'Brand updated', brand);
  }

  async remove(id: number) {
    const brand = await this.brandModel
      .query()
      .update({ is_deleted: true })
      .where({ id });
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return HandleResponse.response(HttpStatus.OK, true, 'Brand deleted');
  }
}
