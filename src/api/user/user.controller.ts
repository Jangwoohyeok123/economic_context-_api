import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 특정 유저 조회
  @Get('/find/:id')
  getOneById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.FindOneById(userId);
  }
}
