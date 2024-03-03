import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 특정 유저 조회
  @Get('/find/:id')
  SelectOneById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.SelectOneById(userId);
  }

  // 유저 관심 지표 추가
  @Post('/favorite/add/:id')
  addFavorite(@Param('id', ParseIntPipe) userId: number, @Body() data: any) {
    return this.userService.addFavorite(userId, data.indicatorId);
  }

  // 유저 관심 지표 획득
  @Post('/favorite/get/:id')
  getFavorite(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getFavoriteIndicators(userId);
  }
}
