import { Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';
import { Indicators } from './entity/indicator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Indicators])],
  controllers: [IndicatorController],
  providers: [IndicatorService],
})
export class IndicatorModule {}
