import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalService } from './journal.service';
import { UpdateJournalDto } from './dto/update-journal.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  // Create
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

  // Read
  @Get('context/:contextId')
  getJournalsByContextId(@Param('contextId') contextId: number) {
    return this.journalService.getJournalsByContextId(contextId);
  }

  // Update
  @Patch(':journalId')
  updateJournal(
    @Param('journalId') journalId: number,
    @Body() updateJournalDto: UpdateJournalDto,
  ) {
    return this.journalService.updateJournal(journalId, updateJournalDto);
  }

  // Delete
  @Delete(':journalId')
  deleteJournal(@Param('journalId') journalId: number) {
    return this.journalService.deleteJournal(journalId);
  }
}
