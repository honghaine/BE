import {
  Controller,
  HttpException,
  HttpStatus,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { UsersService } from './users/users.service';
import { Roles } from './authz/roles.decorator';
import { Permission } from './dtos/permission.enum';
import { UserSignUpDto } from './dtos/userSignUp.dto';
import { CustomExceptionFilter } from './filter/exception.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  @MessagePattern('api')
  testFilter() {
    throw new RpcException({
      statusCode: 200, // Provide your desired status code
      message: 'Invalid credentials.',
    });
  }

  @Roles(Permission.RETRIEVE)
  @MessagePattern('get_all')
  getAll() {
    return this.userService.findAll();
  }

  @MessagePattern('auth_mail')
  async auth(user) {
    try {
      await this.appService.publishMessage(user);
    } catch (error) {
      throw new RpcException(error);
    }
    return `{ 
      "Status": "200"
      "Message": "${user.email} New user login"
    }`;
  }

  @UseGuards(LocalStrategy)
  @Roles(Permission.RETRIEVE)
  @MessagePattern('hi')
  getHello() {
    return 'hi';
  }

  // @UseGuards(LocalStrategy)
  // @Roles(Permission.MANAGE)
  // @MessagePattern('set_role')
  // setRole(user) {
  //   return this.userService.updateUser(user);
  // }

  @MessagePattern('auth')
  async signIn(user: UserDto) {
    const accessToken = await this.authService.signIn(user);
    console.log(accessToken);
    if (!accessToken) {
      throw new RpcException({
        statusCode: 401, // Provide your desired status code
        message: 'Invalid credentials.',
      });
    }
    return { access_token: accessToken };
  }

  @MessagePattern('signup')
  async signUp(user: UserSignUpDto) {
    const accessToken = await this.authService.signUp(user);
    if (!accessToken) {
      throw new RpcException({
        statusCode: 401, // Provide your desired status code
        message: 'Invalid credentials.',
      });
    }
    return { access_token: accessToken };
  }

  @MessagePattern('delete')
  async delete(id: number) {
    return await this.userService.deleteUser(id);
  }

  @MessagePattern('update')
  async update(user) {
    return await this.userService.updateUser(user);
  }

  //For Modertor and data
  @UseGuards(LocalStrategy)
  // @Roles(Role.MOD, Role.ANALYST, Role.ADMIN)
  @MessagePattern('operation')
  operation() {
    return 'Only Modertor and Data Analyst can see this';
  }

  //For mod and user
  @UseGuards(LocalStrategy)
  // @Roles(Role.MOD, Role.USER, Role.ADMIN)
  @MessagePattern('assign')
  assign() {
    return 'Only Modertor and User can see this';
  }

  //For data and user
  @UseGuards(LocalStrategy)
  // @Roles(Role.ANALYST, Role.USER, Role.ADMIN)
  @MessagePattern('analyze')
  analyze() {
    return 'Only Data Analyst and User can see this';
  }
}
