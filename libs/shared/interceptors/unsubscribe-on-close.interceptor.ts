import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { fromEvent, Observable, takeUntil } from "rxjs";

@Injectable()
export class UnsubscribeOnCloseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest() as Request;
    request.on('close', function() {
        console.log('request close')
    })
    const close$ = fromEvent(request, 'close');

    return next.handle().pipe(takeUntil(close$));
  }
}