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
import { AddonsService } from './addons.service';
import { CreateAddonDto, UpdateAddonDto } from './dto/create-addon.dto';
import { AuthGuard } from '../user/guard/user.guard';
import { Roles } from '../user/interface/roles.decorator';
import { RoleGuard } from '../user/guard/role.guard';
import { Role } from '../user/interface/roles';

@Roles(Role.Kitchen)
@UseGuards(AuthGuard, RoleGuard)
@Controller('addons')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Post('/create')
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonsService.create(createAddonDto);
  }

  @Get('/find-all')
  findAll(@Query() params: any) {
    return this.addonsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonsService.findOne(+id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonsService.update(+id, updateAddonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonsService.remove(+id);
  }
}
