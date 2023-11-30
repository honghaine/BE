import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';


@Injectable()
export class AppService {
  constructor(private authService: AuthService, private kafkaProducerService: KafkaProducerService) { }

  publishMessage(user: any) {
    return this.kafkaProducerService.publish(user);
  }

  getHello() {
    return 'Hello World!';
  }
}
