import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthGoogleDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 구글 로그인
  @Post('/google')
  googleLogin(@Body() createAuthGoogleDto: CreateAuthGoogleDto) {
    console.log('servertest', '/google');
    return this.authService.googleLogin(createAuthGoogleDto.code);
  }
}
