import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Vessel } from './vessel/vessel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      logging: true,
      entities: [Vessel],
      subscribers: [],
      migrations: [],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Vessel])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
