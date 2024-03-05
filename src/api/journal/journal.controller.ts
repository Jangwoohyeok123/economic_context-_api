import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post(':userId/:contextId')
  createJournal(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('contextId', ParseIntPipe) contextId: number,
    @Body() createJournalDto: CreateJournalDto,
  ) {
    return this.journalService.createJournal(
      userId,
      contextId,
      createJournalDto,
    );
  }
}
