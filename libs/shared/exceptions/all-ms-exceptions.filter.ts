import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

export class CustomRpcException extends RpcException{
  public statusCode: number
  constructor(statusCode: number, error: string|Error, name: string){
    super(error)
    this.statusCode = statusCode;
  }


}

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    try {
      const statusCode = exception.error.status || 500;
      const message = exception.message || 'Lỗi máy chủ';
      return throwError(() => new CustomRpcException(statusCode, message, exception.error?.name || HttpStatus.INTERNAL_SERVER_ERROR))
    } catch (error) {
      return super.catch(exception, host)
    }
  }
}