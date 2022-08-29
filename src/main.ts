import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalInterceptors(new TimeOutInterceptor);
  app.use(cookieParser());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
