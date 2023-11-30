import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, RolePermissions } from 'src/dtos/role.enum';
import { PERMISSION_KEY } from './roles.decorator';
import { Permission } from 'src/dtos/permission.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request) {
      // If no token is present, deny access.
      return false;
    }
    try {
      // Verify the JWT token and get the user payload.    
      const payload = this.jwtService.verify(
        request.req.replace('Bearer ', ''),
      );
      const userRoles = payload.role;
      if(userRoles === Role.ADMIN) {
        return true;
      } 
      if(RolePermissions[userRoles].includes(requiredRoles[0])){
        return true;
      }
    } catch (error) {
      // If token verification fails, deny access.
      return false;
    }
  }
}
