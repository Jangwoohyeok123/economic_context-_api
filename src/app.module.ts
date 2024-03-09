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

@Module({
  imports: [
    UserModule,
    AuthModule,
    JournalModule,
    IndicatorModule,
    ContextModule,
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
