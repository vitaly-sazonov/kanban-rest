import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { User } from '../users/users.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
