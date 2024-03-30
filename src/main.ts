import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 프로젝트 루트에 있는 .env 파일을 참조하도록 설정합니다.
// 빌드 후에는 dist 디렉토리 내부에서 실행되므로, 상위 폴더로 경로를 설정해야 합니다.
dotenv.config({
  path: path.join(__dirname, '..', '.env'),
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: false,
  };

  app.enableCors(corsOptions);

  await app.listen(4000);
}
bootstrap();
