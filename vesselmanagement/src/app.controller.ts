import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_vessel')
  getVessel({vessel}) {
    return this.appService.findVessel(vessel?.vsl_cd);
  }  
  
  @MessagePattern('detail_vessel')
  getDetailVessel({vessel}) {
    return this.appService.findDetailVessel(vessel);
  }
  
  @MessagePattern('delete_vessel')
  deleteVessel({vessel}) {
    return this.appService.deleteVessel(vessel);
  }  
  
  @MessagePattern('update_vessel')
  updateVessel({id, data}) {
    return this.appService.updateVessel(id, data);
  }
}
