import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

console.log(process.env.DB_USERNAME);

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
