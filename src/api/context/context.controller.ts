import {
  Controller,
  Get,
  Param,
  // Post,
  // Body,
  // Param,
  // Delete,
  // Put,
  // Get,
  UseGuards,
} from '@nestjs/common';
// import { CreateContextDto } from './dto/create-context.dto';
import { ContextService } from './context.service';
// import { UpdateContextDto } from './dto/update-context.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('context')
@UseGuards(AuthGuard)
@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get('user/:userId')
  findAll(@Param('userId') userId: number) {
    return this.contextService.getContextList(userId);
  }

  // @Post(':userId')
  // @ApiOperation({ summary: 'create a new context' })
  // createContext(
  //   @Param('userId') userId: number,
  //   @Body() createContextDto: CreateContextDto,
  // ) {
  //   return this.contextService.createContext(userId, createContextDto);
  // }

  @Get('user/:userId')
  getContextAll(@Param('userId') userId: number) {
    return this.contextService.getContextList(userId);
  }

  // @Get(':contextId')
  // getContext(@Param('contextId') contextId: number) {
  //   return this.contextService.getContext(contextId);
  // }

  // @Get('/name/:userId')
  // getContextNamesByUser(@Param('userId') contextId: number) {
  //   return this.contextService.getContextNamesByUser(contextId);
  // }

  // @Put(':contextId')
  // updateContext(
  //   @Param('contextId') contextId: number,
  //   @Body() updateContextDto: UpdateContextDto,
  // ) {
  //   return this.contextService.updateContext(contextId, updateContextDto);
  // }

  // @Delete(':contextId')
  // async delete(@Param('contextId') contextId: number) {
  //   await this.contextService.deleteContext(contextId);
  // }
}

/* 
  모든 유저의 context를 불러오는 경우는 없는가? 
*/
