import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filter/exception.filter';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERMANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        },
      },
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8866,
        },
      },
      {
        name: 'VESSELMANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  },],
})
export class AppModule { }
