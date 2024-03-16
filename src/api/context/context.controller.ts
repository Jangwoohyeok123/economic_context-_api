import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateContextDto } from './dto/create-context.dto';
import { ContextService } from './context.service';
import { UpdateContextDto } from './dto/update-context.dto';
import { AuthGuard } from '../common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Post(':userId')
  createContext(
    @Param('userId') userId: number,
    @Body() createContextDto: CreateContextDto,
  ) {
    return this.contextService.createContext(userId, createContextDto);
  }

  @Get()
  getContextAll() {
    return this.contextService.getContextAll();
  }

  @Get(':contextId')
  getContext(@Param('contextId') contextId: number) {
    return this.contextService.getContext(contextId);
  }

  @Get('/name/:userId')
  getContextNamesByUser(@Param('userId') contextId: number) {
    return this.contextService.getContextNamesByUser(contextId);
  }

  @Put(':contextId')
  updateContext(
    @Param('contextId') contextId: number,
    @Body() updateContextDto: UpdateContextDto,
  ) {
    return this.contextService.updateContext(contextId, updateContextDto);
  }

  @Delete(':contextId')
  deleteContext(@Param('contextId') contextId: number) {
    return this.contextService.deleteContext(contextId);
  }
}
