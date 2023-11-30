import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dtos/user.dto';
import { UserSignUpDto } from 'src/dtos/userSignUp.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find(
      {
        select: {
          id: true,
          username: true,
          ofc_cd: true,
          cntr_cd: true,
          upd_dt: true,
          upd_usr: true,
          role: true,
        },
        order: {
          id: "ASC",
        }
      }
    )
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async addUser(user: UserSignUpDto) {
    return await this.usersRepository.insert({
      username: user.username,
      password: user.password,
      ofc_cd: 'SINHQ',
      cntr_cd: 'VN',
      upd_dt: new Date(),
      upd_usr: user.username,
      role: 'user',
    })
  }

  async findUser(usernameInput: string): Promise<any | undefined> {
    const account = await this.usersRepository.find(
      {
        select: {
          username: true,
          password: true,
          role: true,
          id: true,
        },
        where: {
          username: usernameInput
        }
      }
    )
    return account;
  }

  async deleteUser(id: number) {
    return await this.usersRepository.delete(id);
  }

  async updateUser(user) {
    return await this.usersRepository.update(
      user.id,
      {
        username: user.username,
        ofc_cd: user.ofc_cd,
        cntr_cd: 'VN',
        upd_dt: new Date(),
        upd_usr: user.username,
        role: user.role,
      }
    )
  }

  // async updateUser(updatedUser) {
  //   const existUser = this.users.findIndex((user) => {
  //     return user.username === updatedUser.username;
  //   });
  //   if (!existUser) {
  //     return 'User not found';
  //   }
  //   if (
  //     (existUser && updatedUser.role == 'admin') ||
  //     updatedUser.role == 'user' ||
  //     updatedUser.role == 'mod'
  //   ) {
  //     this.users[existUser].role = updatedUser.role;
  //     return this.users;
  //   }
  //   if (
  //     updatedUser.role == '' ||
  //     updatedUser.role !== 'admin' ||
  //     updatedUser.role !== 'user' ||
  //     updatedUser.role !== 'mod'
  //   ) {
  //     return 'Invalid Role';
  //   }
  // }
}
