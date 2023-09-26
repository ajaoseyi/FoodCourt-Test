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
import { MealService } from './meal.service';
import { CreateMealDto, UpdateMealDto } from './dto/create-meal.dto';
import { RoleGuard } from '../user/guard/role.guard';
import { AuthGuard } from '../user/guard/user.guard';
import { Role } from '../user/interface/roles';
import { Roles } from '../user/interface/roles.decorator';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Roles(Role.Kitchen)
  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.mealService.findAll(params);
  }

  @Roles(Role.Kitchen)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(+id);
  }

  @Roles(Role.Kitchen)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(+id, updateMealDto);
  }

  @Roles(Role.Kitchen)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(+id);
  }
}
