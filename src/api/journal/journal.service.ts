import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Journals } from './entity/journal.entity';
import { Repository } from 'typeorm';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';

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

  async getJournalsByContextId(contextId: number): Promise<Journals[]> {
    return this.journalRepository.find({
      where: { context: { id: contextId } },
    });
  }

  async updateJournal(
    journalId: number,
    updateJournalDto: UpdateJournalDto,
  ): Promise<Journals> {
    const journal = await this.journalRepository.findOneBy({ id: journalId });
    if (!journal) {
      throw new Error('Journal not found');
    }
    this.journalRepository.merge(journal, updateJournalDto);
    return this.journalRepository.save(journal);
  }

  async deleteJournal(journalId: number): Promise<void> {
    const result = await this.journalRepository.delete(journalId);
    if (result.affected === 0) {
      throw new Error('Journal not found');
    }
  }
}
