import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.startAllMicroservices();
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3001);
}
bootstrap();
