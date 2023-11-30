import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notifies')
  getAll() {
    return "hello";
  }  
  
  @MessagePattern('notify')
  publishMessage(@Payload() user, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    const { headers, timestamp } = originalMessage;
    console.log(`Topic: ${context.getTopic()}`);
    console.log(originalMessage);
    console.log(partition);
    return user.value;
  }



}
