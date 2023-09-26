import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCalculatedOrderDto {
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsNumber()
  order_type_id: number;

  @IsBoolean()
  @IsOptional()
  free_delivery?: boolean;

  @IsNumber()
  @Min(0.01)
  delivery_fee: number;

  @IsNumber()
  @Min(0.01)
  service_charge: number;

  @IsNotEmpty()
  @IsObject()
  address_details: object;

  @ValidateNested({ each: true })
  @Type(() => Meal)
  meals: Meal[];

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class UpdateCalculatedOrderDto {
  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsBoolean()
  free_delivery?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  delivery_fee?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  service_charge?: number;

  @IsOptional()
  @IsObject()
  address_details?: object;

  @ValidateNested({ each: true })
  @Type(() => Meal)
  meals: Meal[];

  @IsOptional()
  @IsNumber()
  user_id?: number;
}

class Brand {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

class MealData {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  amount: string;

  @IsString()
  brand_id: string;

  @IsString()
  item_type: string;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}

class Addon {
  @IsString()
  id: string;

  @IsNumber()
  amount: number;

  @IsString()
  meal_id: string;

  @ValidateNested()
  @Type(() => MealData)
  meal_data: MealData;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}

class Meal {
  @IsNumber()
  id: number;

  @IsBoolean()
  new: boolean;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => Brand)
  brand: Brand;

  @IsBoolean()
  active: boolean;

  @ValidateNested()
  @Type(() => Addon)
  addons: Addon[];

  @IsString()
  amount: string;

  @IsNumber()
  quantity: number;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsString()
  description: string;
}
