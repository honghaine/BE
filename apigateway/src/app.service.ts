import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dtos/user.dto';
import { UserSignUpDto } from './dtos/UserSignUp.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERMANAGEMENT')
    private readonly userManagementClient: ClientProxy,
    @Inject('NOTIFICATION')
    private readonly notificationClient: ClientProxy, 
    @Inject('VESSELMANAGEMENT')
    private readonly vesselManagementClient: ClientProxy,
  ) { }

  // Test API
  testfilter() {
    return this.userManagementClient.send('api',{});
  }

  // USERMANAGEMENT
  getAll(req) {
    return this.userManagementClient.send('get_all', { req });
  }

  getHello(req) {
    return this.userManagementClient.send('hi', { req });
  }

  signIn(user: UserDto) {
    return this.userManagementClient.send('auth', user);
  }

  signUp(user: UserSignUpDto) {
    return this.userManagementClient.send('signup', user);
  }

  deleteUser(id: number) {
    return this.userManagementClient.send('delete', id);
  }

  updateUser(user) {
    return this.userManagementClient.send('update', user);
  }

  setRole(user) {
    return this.userManagementClient.send('set_role', user);
  }

  operation(req) {
    return this.userManagementClient.send('operation', { req });
  }

  assign(req) {
    return this.userManagementClient.send('assign', { req });
  }

  analyze(req) {
    return this.userManagementClient.send('analyze', { req });
  }
  
  auth(req) {
    return this.userManagementClient.send('auth_mail',  req );
  }

  //Notification
  testnotification(req) {
    return this.notificationClient.send('notify', { req });
  }

  // Vessel Management
  getVessel(vessel: any) {
    return this.vesselManagementClient.send('get_vessel',{vessel});
  }

  getDetailVessel(vessel) {
    return this.vesselManagementClient.send('detail_vessel', {vessel})
  }  
  
  deleteVessel(vessel) {
    return this.vesselManagementClient.send('delete_vessel', {vessel})
  }  
  
  updateVessel(id, data) {
    return this.vesselManagementClient.send('update_vessel', {id, data})
  }

}
