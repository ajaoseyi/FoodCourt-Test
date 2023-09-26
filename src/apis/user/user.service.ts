import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import HandleResponse from '../../shared/Response/HandleResponse';
import { ModelClass } from 'objection';
import { UserModel } from 'src/db/models/User';
import { JwtService } from '@nestjs/jwt';
import PasswordHash from '../../shared/hash/password.hash';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
    private jwtService: JwtService,
    private passwordHash: PasswordHash,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const emailExists = await this.userModel
        .query()
        .findOne({ email: createUserDto.email });
      if (emailExists) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      const hashedPassword = await this.passwordHash.hashPassword(
        createUserDto.password,
      );
      createUserDto.password = hashedPassword;
      const user = await this.userModel.query().insert(createUserDto);
      if (!user) {
        throw new HttpException(
          'User not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return HandleResponse.response(
        200,
        true,
        'User created successfully',
        user,
      );
    } catch (e) {
      Logger.error(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .query()
      .findOne({ email: loginUserDto.email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user };
    const token = await this.jwtService.signAsync(payload);
    return HandleResponse.response(HttpStatus.OK, true, 'User logged in', {
      user,
      token,
    });
  }
}
