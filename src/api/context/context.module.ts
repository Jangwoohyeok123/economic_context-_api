import { Module } from '@nestjs/common';
import { ContextController } from './context.controller';
import { ContextService } from './context.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contexts } from './entity/context.entity';
import { UserModule } from '../user/user.module';
import { IndicatorService } from '../indicator/indicator.service';
import { Indicators } from '../indicator/entity/indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contexts, Indicators]), UserModule],
  controllers: [ContextController],
  providers: [ContextService, IndicatorService],
  exports: [ContextService],
})
export class ContextModule {}
