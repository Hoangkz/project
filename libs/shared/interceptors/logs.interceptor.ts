import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import moment from 'moment';
import { map, Observable } from 'rxjs';

export class LogsInterceptor implements NestInterceptor {
  constructor(
    private readonly appName: string,
    private readonly excludesControllers?: string[],
  ) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (
      this.excludesControllers &&
      this.excludesControllers.includes(context.getClass().name)
    ) {
      return next.handle();
    }
    const req: Request = context.switchToHttp().getRequest();
    const userName = (req.user as any)?.loginName || 'guest';
    const startTime = moment(new Date());
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    console.log(
      `[${this.appName
      }][${userName}]-[Request --> ${controller}/${handler}] : at ${startTime.format(
        'hh:mm:ss',
      )}`,
    );
    return next.handle().pipe(
      map((res) => {
        const toTime = moment(new Date());
        console.log(
          `[${this.appName
          }][${userName}]-[Request --> ${controller}/${handler}] : after ${toTime.diff(startTime) / 1000
          }s `,
        );
        return res;
      }),
    );
  }
}
