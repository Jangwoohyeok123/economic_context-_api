import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Journals } from './entity/journal.entity';
import { Repository } from 'typeorm';
import { CreateJournalDto } from './dto/create-journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journals)
    private journalRepository: Repository<Journals>,
  ) {}

  async createJournal(
    userId: number,
    contextId: number,
    createJournalDto: CreateJournalDto,
  ): Promise<Journals> {
    const newJournal = this.journalRepository.create({
      ...createJournalDto,
      user: { id: userId },
      context: { id: contextId },
    });

    return this.journalRepository.save(newJournal);
  }
}
