import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthzModule } from './authz/authz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { KafkaProducerModule } from './kafka-producer/kafka-producer.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filter/exception.filter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AuthzModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      logging: true,
      entities: [User],
      subscribers: [],
      migrations: [],
      autoLoadEntities: true,
    }),
    KafkaProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  }],
})
export class AppModule {}
