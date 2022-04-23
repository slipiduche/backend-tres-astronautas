import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //  forbidNonWhitelisted: true  //if we want denegate request with more data
    }),
  );
  await app.listen(3000);
}
bootstrap();
