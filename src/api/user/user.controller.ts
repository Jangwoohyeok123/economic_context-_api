import {
  Body,
  Controller,
  Delete,
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

  // 유저 관심 지표 전체 획득
  @Get('/favorite/:id')
  getFavoriteIndicatorsAll(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getFavoriteIndicatorsAll(userId);
  }

  // 유저 관심 지표 타입별 획득
  @Get('/favorite/:id/:type')
  getFavoriteIndicatorsByType(
    @Param('id', ParseIntPipe) userId: number,
    @Param('type', ParseIntPipe) type: number,
  ) {
    return this.userService.getFavoriteIndicatorsByType(userId, type);
  }

  // 유저 관심 지표 추가
  @Post('/favorite/:id')
  addFavorite(@Param('id', ParseIntPipe) userId: number, @Body() data: any) {
    return this.userService.addFavoriteOne(userId, data.indicatorId);
  }

  // 유저 관심 지표 삭제
  @Delete('/favorite/:id')
  deleteFavorite(@Param('id', ParseIntPipe) userId: number, @Body() data: any) {
    return this.userService.deleteFavoriteOne(userId, String(data.indicatorId));
  }
}
