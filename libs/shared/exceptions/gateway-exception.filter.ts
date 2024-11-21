import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost): void {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>()
    console.log(exception)
    const httpStatus = exception instanceof HttpException ? exception.getStatus?.() : exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
        ...exception,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url
    };
    res.status(httpStatus).json(responseBody)
  }
}