import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}

export class UpdateBrandDto {
  @IsOptional()
  @IsString()
  description: string;

  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty()
  @IsString()
  name: string;
}
