import { Module } from '@nestjs/common';
import { ContextController } from './context.controller';
import { ContextService } from './context.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contexts } from './entity/context.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contexts])],
  controllers: [ContextController],
  providers: [ContextService],
})
export class ContextModule {}
