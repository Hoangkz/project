import { UserPermissions } from './user.permissions';
type ValueOf<T> = T[keyof T];

export const ApiPermissions = {
  /** Common */
  ...UserPermissions,
} as const;

export type ApiPermissionTypes = ValueOf<typeof ApiPermissions>;
