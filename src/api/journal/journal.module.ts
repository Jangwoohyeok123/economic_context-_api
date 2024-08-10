import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from '../context/entity/context.entity';
import { Journal } from './entity/journal.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Context, Journal])],
  controllers: [JournalController],
  providers: [JournalService, JwtService],
})
export class JournalModule {}
