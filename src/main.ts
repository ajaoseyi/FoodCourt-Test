import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { classValidatorPipeInstance } from './shared/pipes';
import { ConfigService } from '@nestjs/config';

const port = process.env.PORT || 4001;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(classValidatorPipeInstance());
  const configService = app.get(ConfigService);
  const ports = configService.get('PG_PORT') || 8000;
  console.log(ports);
  app.setGlobalPrefix('api/v1');
  Logger.log(`🚀  Server ready at http://localhost:${port} `, 'ServerStarted');
  await app.listen(port);
}
bootstrap();
