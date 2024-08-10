import { Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';
import { Indicator } from './entity/indicator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  controllers: [IndicatorController],
  providers: [IndicatorService],
  exports: [IndicatorService], // IndicatorService를 export
})
export class IndicatorModule {}
