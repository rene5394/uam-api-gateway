import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOrigins = process.env.CORS_DOMAIN.split(' ');
  app.enableCors({
    origin : corsOrigins,
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.useGlobalInterceptors(new TimeOutInterceptor);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('UAM API Documentation')
    .setDescription('UAM Microservices URL map')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
