import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { classValidatorPipeInstance } from './shared/pipes';
import * as dotenv from 'dotenv';

const port = process.env.PORT || 4001;
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(classValidatorPipeInstance());
  app.setGlobalPrefix('api/v1');
  Logger.log(`🚀  Server ready at http://localhost:${port} `, 'ServerStarted');
  await app.listen(port);
}
bootstrap();
