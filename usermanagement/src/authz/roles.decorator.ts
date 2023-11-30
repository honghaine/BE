import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/dtos/permission.enum';

export const PERMISSION_KEY = 'permission';
export const Roles = (...permissions: Permission[]) => SetMetadata(PERMISSION_KEY, permissions);
