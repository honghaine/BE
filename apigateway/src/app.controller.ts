import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Email, UserDto } from './dtos/user.dto';
import { UserSignUpDto } from './dtos/UserSignUp.dto';
import { CustomExceptionFilter } from './filter/exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Get('Hi')
  getHello(@Request() req) {
    const auth = req.headers['authorization'];
    return this.appService.getHello(auth);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getall')
  getAll(@Request() req) {
    const auth = req.headers['authorization'];
    return this.appService.getAll(auth);
  }

  @HttpCode(HttpStatus.OK)
  @Get('api')
  getTest() {
    return this.appService.testfilter();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() user: UserDto) {
    return this.appService.signIn(user);
  }  

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signUp(@Body() user: UserSignUpDto) {
    return this.appService.signUp(user);
  }  
  
  @HttpCode(HttpStatus.OK)
  @Post('/update')
  updateUser(@Body() user) {
    return this.appService.updateUser(user);
  }  
  
  @HttpCode(HttpStatus.OK)
  @Post('/delete')
  deleteUser(@Body() user) {
    return this.appService.deleteUser(user.id.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/operation')
  operation(@Request() req) {
    const auth = req.headers['authorization'];
    return this.appService.operation(auth);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/assign')
  assign(@Request() req) {
    const auth = req.headers['authorization'];
    return this.appService.assign(auth);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/analyze')
  analyze(@Request() req) {
    const auth = req.headers['authorization'];
    return this.appService.analyze(auth);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/updateUserRole')
  setRole(@Body() user) {
    return this.appService.setRole(user);
  }  

  @HttpCode(HttpStatus.OK)
  @Post('/auth')
  auth(@Body() user: Email) {
    return this.appService.auth(user);
  }
  
  @HttpCode(HttpStatus.OK)
  @Get('/notify')
  testNotification(@Body() user) {
    return this.appService.testnotification(user);
  }

  // Vessel Management 
  @HttpCode(HttpStatus.OK)
  @Post('/vessel')
  getVessel(@Body() vessel) {
    return this.appService.getVessel(vessel);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/vessel/:id')
  getDetailVessel(@Param('id') id) {
    return this.appService.getDetailVessel(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/vessel/:id')
  deleteVessel(@Param('id') id) {
    return this.appService.deleteVessel(id);
  }  
  
  @HttpCode(HttpStatus.OK)
  @Put('/vessel/:id')
  updateVessel(@Param('id') id, @Body() {data}) {
    return this.appService.updateVessel(id, data);
  }
}
