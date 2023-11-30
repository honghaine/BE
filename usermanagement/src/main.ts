import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CustomExceptionFilter } from './filter/exception.filter';
import { IoAdapter } from '@nestjs/platform-socket.io';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    },
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen();
  // const app = await NestFactory.create(AppModule);
  // // microservice #1
  // const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //     options: {
  //       host: '127.0.0.1',
  //       port: 8877,
  //     },
  // });
  // // microservice #2
  // const microserviceKafka = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'hero', // hero-server
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'hero-consumer' // hero-consumer-server
  //     },
  //     producer: {
  //       createPartitioner: Partitioners.LegacyPartitioner,
  //     }
  //   },
  // });

  // await app.startAllMicroservices();
  // await app.init();


}
bootstrap();
