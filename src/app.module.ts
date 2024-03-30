import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { JournalModule } from './api/journal/journal.module';
import { IndicatorModule } from './api/indicator/indicator.module';
import { ContextModule } from './api/context/context.module';
import * as ormconfig from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { Users } from './api/user/entity/user.entity';
import { Indicators } from './api/indicator/entity/indicator.entity';
import { Contexts } from './api/context/entity/context.entity';
import { Journals } from './api/journal/entity/journal.entity';
import { LoggingMiddleware } from './api/common/middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JournalModule,
    IndicatorModule,
    ContextModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        NEXT_PUBLIC_FREDKEY: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_REDIRECT_URI: Joi.string().uri().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(), // 비밀번호가 비어 있을 수 있음을 허용합니다.
        DB_DATABASE: Joi.string().required(),
        DB_HOST: Joi.string().hostname().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Users, Indicators, Contexts, Journals]),
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
