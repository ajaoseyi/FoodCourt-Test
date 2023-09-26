import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  ValidateIf,
  IsNumber,
} from 'class-validator';

export class CreateOrderLogDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsISO8601()
  time: string;
}

export class UpdateOrderLogDto {
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ValidateIf((object, value) => value !== undefined)
  @IsISO8601()
  @IsOptional()
  time?: string;
}
