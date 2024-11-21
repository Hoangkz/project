import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { Observable } from 'rxjs';

export type ResDataType<TBody> = {
  params: any;
  query: any;
  body: TBody;
};

export interface GetResourceIdFunc<TBody> {
  (res: ResDataType<TBody>): string;
}

@Injectable()
export class ResourceGuard<TBody> implements CanActivate {
  private getResourceIdFunc: GetResourceIdFunc<TBody>;
  private role?: string | string[];
  constructor(
    getResourceIdFunc: GetResourceIdFunc<TBody>,
    role: string | string[] = 'owner',
  ) {
    this.getResourceIdFunc = getResourceIdFunc;
    this.role = role;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (user.isAdmin) {
      return true;
    }
    const resData: ResDataType<TBody> = {
      body: request.body,
      params: request.params,
      query: request.query,
    };
    const requiredResources = [];
    const resourceIds = this.getResourceIdFunc(resData);
    if (isEmpty(resourceIds)) {
      throw new ForbiddenException(
        `Thiếu tham số ${this.getResourceIdFunc}. Bạn không đủ quyền sử dụng tài nguyên này.`,
      );
    } else {
      if (Array.isArray(resourceIds)) {
        requiredResources.push(
          ...resourceIds.map((resourceId) => {
            return {
              resourceId,
              role: this.role,
            };
          }),
        );
      } else {
        requiredResources.push({
          resourceId: resourceIds,
          role: this.role,
        });
      }
    }
    if (
      requiredResources.some(
        (c) =>
          user.resources.findIndex((o) => {
            return (
              c.resourceId === o.resourceId &&
              (isEmpty(c.role) || Array.isArray(c.role)
                ? c.role.includes(o.role)
                : c.role === o.role)
            );
          }) > -1,
      )
    )
      return true;
    throw new ForbiddenException(`Bạn không có quyền sử dụng tài nguyên này`);
  }
}
