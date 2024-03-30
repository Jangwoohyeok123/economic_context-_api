import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // 여기서 환경 변수를 로드합니다.
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: false,
  };

  app.enableCors(corsOptions);

  await app.listen(4000);
}
bootstrap();
