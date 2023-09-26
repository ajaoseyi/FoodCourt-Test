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
import { OrdertypeService } from './ordertype.service';
import {
  CreateOrdertypeDto,
  UpdateOrderTypeDto,
} from './dto/create-ordertype.dto';
import { RoleGuard } from '../user/guard/role.guard';
import { AuthGuard } from '../user/guard/user.guard';
import { Role } from '../user/interface/roles';
import { Roles } from '../user/interface/roles.decorator';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('ordertype')
export class OrdertypeController {
  constructor(private readonly ordertypeService: OrdertypeService) {}

  @Post('create')
  create(@Body() createOrdertypeDto: CreateOrdertypeDto) {
    return this.ordertypeService.create(createOrdertypeDto);
  }

  @Get('find-all')
  findAll(@Query() params: any) {
    return this.ordertypeService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordertypeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdertypeDto: UpdateOrderTypeDto,
  ) {
    return this.ordertypeService.update(+id, updateOrdertypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordertypeService.remove(+id);
  }
}
