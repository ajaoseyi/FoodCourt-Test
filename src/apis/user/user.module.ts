import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import PasswordHash from '../../shared/hash/password.hash';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret:
        '7f3d8e25a6d19c8b3fb9d8e7a4f0d1c5bc41d7f86e2a95c0f9b3a7e5c0f1d9e27f8e2a9c0f1d9e2b0c3a6e8d5f1',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PasswordHash],
})
export class UserModule {}
