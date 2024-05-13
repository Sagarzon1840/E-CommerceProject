import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API BackEnd Módulo 4')
    .setDescription('Demo creada en Nest JS para el proyecto del módulo 4')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  //* http://localhost:3000/api
  SwaggerModule.setup('api', app, document);

  app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
