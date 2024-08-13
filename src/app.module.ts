import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { JournalModule } from './api/journal/journal.module';
import { IndicatorModule } from './api/indicator/indicator.module';
import { ContextModule } from './api/context/context.module';
import * as ormconfig from '../ormconfig';
import * as typeorm from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { User } from './api/user/entity/user.entity';
import { Indicator } from './api/indicator/entity/indicator.entity';
import { Context } from './api/context/entity/context.entity';
import { Journal } from './api/journal/entity/journal.entity';
import { LoggingMiddleware } from './api/common/middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { News } from './api/news/entity/news.entity';
import {
  FavoriteIndicator,
  FavoriteNews,
} from './api/favorite/entity/favorite.entity';
import { Tag } from './api/tag/entity/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    UserModule,
    AuthModule,
    JournalModule,
    IndicatorModule,
    ContextModule,
    typeorm.TypeOrmModule.forFeature([
      User,
      Indicator,
      Context,
      Journal,
      News,
      FavoriteIndicator,
      FavoriteNews,
      Tag,
    ]),
    typeorm.TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
