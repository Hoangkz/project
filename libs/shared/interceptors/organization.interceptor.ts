import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
  NestInterceptor,
  NotAcceptableException,
  Type,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { MsOrganizationQuery } from '../cqrs/query/ms-organization.query';
import { Organization } from '../entities/ms-organization/organization.entity';
import { MS_ORGANIZATION } from '../services';

interface FuncT<T, TResult> {
  (body: T): TResult;
}

function OrganizationInterceptor(
  organizationMapFieldId?: string | FuncT<any, string>,
): Type<NestInterceptor> {
  @Injectable()
  class OrgInterceptor implements NestInterceptor {
    constructor(
      @Inject(MS_ORGANIZATION)
      private readonly msOrganization: ClientProxy,
    ) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest<any>();
      const organizationId =
        request.headers['x-organization-id'] ||
        request.headers['X-Organization-Id'];
      if (!organizationId) {
        throw new NotAcceptableException(
          'Không tìm thấy ID đơn vị. Bạn không có quyền thực hiện chức năng này.',
        );
      }
      request.organizationId = organizationId as string;
      return new Promise(async (resolve) => {
        const organization: Organization = await lastValueFrom(
          this.msOrganization.send(MsOrganizationQuery.GetById, organizationId),
        );
        if (!organization) {
          throw new NotAcceptableException(
            'Không tìm thấy thông tin đơn vị. Bạn không có quyền thực hiện chức năng này.',
          );
        }
        request.organization = organization;
        request.organizations = await lastValueFrom(
          this.msOrganization.send(
            MsOrganizationQuery.FindDescendants,
            organization.id,
          ),
        );
        if (!organizationMapFieldId) {
          resolve(next.handle());
        } else {
          const validateOrganizationId =
            typeof organizationMapFieldId === 'string'
              ? request.body[organizationMapFieldId]
              : organizationMapFieldId(request.body);

          if (
            request.organizations.findIndex(
              (c) => c.id === validateOrganizationId,
            ) > -1
          ) {
            resolve(next.handle());
          } else {
            throw new NotAcceptableException(
              'Bạn không có quyền thực hiện chức năng của đơn vị này.',
            );
          }
        }
      });
    }
  }
  return mixin(OrgInterceptor);
}

export default OrganizationInterceptor;
