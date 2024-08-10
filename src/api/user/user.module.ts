import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicators } from '../indicator/entity/indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Indicators])],
  controllers: [UserController],
  providers: [UserService, JwtService, IndicatorService],
  exports: [UserService], // UserService를 export
})
export class UserModule {}
