import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CalculatedorderService } from './calculatedorder.service';
import {
  CreateCalculatedOrderDto,
  UpdateCalculatedOrderDto,
} from './dto/create-calculatedorder.dto';
import { AuthGuard } from '../user/guard/user.guard';
import { RoleGuard } from '../user/guard/role.guard';
import { Role } from '../user/interface/roles';
import { Roles } from '../user/interface/roles.decorator';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('calculatedorder')
export class CalculatedorderController {
  constructor(
    private readonly calculatedorderService: CalculatedorderService,
  ) {}

  @Roles(Role.User)
  @Post()
  create(@Body() createCalculatedorderDto: CreateCalculatedOrderDto) {
    return this.calculatedorderService.create(createCalculatedorderDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.calculatedorderService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculatedorderService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalculatedorderDto: UpdateCalculatedOrderDto,
  ) {
    return this.calculatedorderService.update(+id, updateCalculatedorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculatedorderService.remove(+id);
  }
}
