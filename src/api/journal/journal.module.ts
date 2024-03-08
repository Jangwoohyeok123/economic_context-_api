import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contexts } from '../context/entity/context.entity';
import { Journals } from './entity/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contexts, Journals])],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
