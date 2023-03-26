import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
    credentials: true,
    methods: ['HEAD', 'GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
