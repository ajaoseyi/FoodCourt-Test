import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
  IsObject,
} from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  @IsNumber()
  meal_id: number;

  @IsNotEmpty()
  @IsObject()
  meal_data: object;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class UpdateAddonDto {
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  meal_id?: number;

  @ValidateIf((object, value) => value !== undefined)
  @IsObject()
  @IsOptional()
  meal_data?: object;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}
