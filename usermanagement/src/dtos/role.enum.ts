import { Permission } from "./permission.enum";

export enum Role {
  ADMIN   = 'admin',
  USER    = 'user',
  MOD     = 'mod',
  ANALYST = 'analyst',
}


export const RolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [Permission.MANAGE],
  [Role.USER]: [Permission.DELETE],
  [Role.MOD]: [Permission.DELETE, Permission.RETRIEVE],
  [Role.ANALYST]: [Permission.RETRIEVE, Permission.UPDATE]
};
