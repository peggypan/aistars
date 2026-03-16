import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Swagger API Docs
  const config = new DocumentBuilder()
    .setTitle('AI Stars API')
    .setDescription('AI影视演员库 API')
    .setVersion('0.1.0')
    .addTag('stars', '演员管理')
    .addTag('categories', '分类管理')
    .addTag('movies', '作品管理')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 AI Stars API running on http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
}
bootstrap();