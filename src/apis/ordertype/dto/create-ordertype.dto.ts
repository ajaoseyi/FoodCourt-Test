import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateOrdertypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateOrderTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
