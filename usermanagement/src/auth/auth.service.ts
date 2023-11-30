import { UserSignUpDto } from './../dtos/userSignUp.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: UserDto): Promise<string | null> {
    const findUser = await this.usersService.findUser(user.username);

    if (!findUser || findUser.length === 0 || findUser[0]?.password !== user.password) {
      throw new RpcException({
        statusCode: 400, // Provide your desired status code
        message: 'Invalid username or password',
      });
    }
    const id = findUser[0].id;
    const role = findUser[0].role;
    const payload = { username: findUser[0].username, sub: id, role: role };
    const accessToken = this.jwtService.signAsync(payload);
    return accessToken;
  }

  async signUp(user: UserSignUpDto) {
    const findUser: [] = await this.usersService.findUser(user.username);

    if(findUser.length>=1) {
      throw new RpcException({
        statusCode: 400, // Provide your desired status code
        message: 'Already had this username',
      });
    }

    if(user.password !== user.repassword) {
      throw new RpcException({
        statusCode: 400, // Provide your desired status code
        message: 'Password and re-password must be identical',
      });
    }

    await this.usersService.addUser(user);
    const findSavedUser = await this.usersService.findUser(user.username);

    const id = findSavedUser[0].id;
    const role = findSavedUser[0].role;
    const payload = { username: findSavedUser[0].username, sub: id, role: role };
    const accessToken = this.jwtService.signAsync(payload);
    return accessToken;
  }
}
