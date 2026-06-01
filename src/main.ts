import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({limit:'1mb'}));
  app.use(express.urlencoded({limit:'1mb',extended:true}));
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }))
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
