import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { HttpErrorHandler } from './shared/Handlers/http-error.handler';
import { LoggingInterceptor } from './shared/Interceptors/logging.interceptor';
import { TimeoutInterceptor } from './shared/Interceptors/timeout.interceptor';
import { ConfigModule } from '@nestjs/config';
import HandleResponse from './shared/Response/HandleResponse';
import { APIModule } from './apis';
import { RequestLoggerMiddleware } from './shared/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    APIModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HandleResponse,
    HttpErrorHandler,
    LoggingInterceptor,
    TimeoutInterceptor,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
