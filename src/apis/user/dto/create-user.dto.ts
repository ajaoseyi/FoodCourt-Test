import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../interface/roles';
export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @MinLength(3, { message: 'name is too short' })
  readonly name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  readonly email: string;

  //enum
  @IsNotEmpty({ message: 'role is required' })
  @IsEnum(Role, {
    message: 'Invalid role. Role should be one of: user, kitchen',
  })
  readonly roles: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password is too short' })
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  readonly email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password is too short' })
  readonly password: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @MinLength(3, { message: 'name is too short' })
  readonly name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  readonly email: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'old password is required' })
  @MinLength(6, { message: 'old password is too short' })
  readonly oldPassword: string;

  @IsNotEmpty({ message: 'new password is required' })
  @MinLength(6, { message: 'new password is too short' })
  readonly newPassword: string;
}
