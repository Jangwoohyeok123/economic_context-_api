import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [AuthService, JwtService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
