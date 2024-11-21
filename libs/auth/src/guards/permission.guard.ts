import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { Observable } from 'rxjs';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requirePermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!requirePermissions || requirePermissions.includes('*')) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as User;
    if (user.isAdmin) {
      return true;
    }
    return user.permissions
      .map((c) => c.name)
      .some((name) => requirePermissions.includes(name));
  }
}
