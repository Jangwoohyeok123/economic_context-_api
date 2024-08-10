import { Module } from '@nestjs/common';
import { ContextController } from './context.controller';
import { ContextService } from './context.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from './entity/context.entity';
import { UserModule } from '../user/user.module';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicator } from '../indicator/entity/indicator.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Context, Indicator]), UserModule],
  controllers: [ContextController],
  providers: [ContextService, IndicatorService, JwtService],
  exports: [ContextService],
})
export class ContextModule {}
