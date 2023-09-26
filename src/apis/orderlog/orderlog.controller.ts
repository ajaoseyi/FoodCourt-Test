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
import { OrderlogService } from './orderlog.service';
import {
  CreateOrderLogDto,
  UpdateOrderLogDto,
} from './dto/create-orderlog.dto';
import { RoleGuard } from '../user/guard/role.guard';
import { AuthGuard } from '../user/guard/user.guard';
import { Role } from '../user/interface/roles';
import { Roles } from '../user/interface/roles.decorator';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('orderlog')
export class OrderlogController {
  constructor(private readonly orderlogService: OrderlogService) {}

  @Post('create')
  create(@Body() createOrderlogDto: CreateOrderLogDto) {
    return this.orderlogService.create(createOrderlogDto);
  }

  @Get('find-all')
  findAll(@Query() params: any) {
    return this.orderlogService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderlogService.findOne(+id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateOrderlogDto: UpdateOrderLogDto,
  ) {
    return this.orderlogService.update(+id, updateOrderlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderlogService.remove(+id);
  }
}
