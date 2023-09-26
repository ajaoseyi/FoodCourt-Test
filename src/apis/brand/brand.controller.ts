import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';
import { RoleGuard } from '../user/guard/role.guard';
import { AuthGuard } from '../user/guard/user.guard';
import { Role } from '../user/interface/roles';
import { Roles } from '../user/interface/roles.decorator';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/create')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get('/find-all')
  findAll(@Query() params: any) {
    return this.brandService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
