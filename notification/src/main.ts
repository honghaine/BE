import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       host: '127.0.0.1',
  //       port: 8866,
  //     },
  //   },
  // );

  // await app.listen();


  const app = await NestFactory.create(AppModule);
  // microservice #1
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8866,
    },
  });
  // microservice #2
  const microserviceKafka = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka-client', // hero-server
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer' // hero-consumer-server
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      }
    },
  });

  await app.startAllMicroservices();
  await app.init();

}
bootstrap();

