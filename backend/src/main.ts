import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger';
import helmet from 'helmet';
import CorsOptions from './config/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  setupSwagger(app);
  app.enableCors(CorsOptions);
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
