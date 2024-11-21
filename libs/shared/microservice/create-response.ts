import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

export type ErrorReponseType = Error | string;

export interface MsResponse {
  status: HttpStatus;
  message?: string;
  data?: any;
}

export function responseSuccess(
  data: any,
  status: HttpStatus = HttpStatus.OK,
): MsResponse {
  return {
    status: HttpStatus.OK,
    data,
  };
}

export function responseError(
  error: ErrorReponseType,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
): MsResponse {
  return {
    status: status,
    message: typeof error === 'string' ? error : error.message,
  };
}

export function throwRpcError(error: Error) {
  if (process.env.NODE_ENV === 'dev') {
    console.log(error);
  }
  throw new RpcException(error);
}

export const catchRpcException = () => {
  const rs = function (source: Observable<any>) {
    return source.pipe(
      catchError((error) => {
        if (process.env.NODE_ENV === 'dev') {
          console.log(error);
        }
        if (
          error?.status === 422 ||
          error?.status?.status === 422 ||
          error.statusCode === 422
        ) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              message: error.message,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return throwError(() => new RpcException(error.response));
      }),
    );
  };
  return rs;
};

export const catchRpcPromise = (error) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(error);
  }
  throw new RpcException(new BadRequestException(error));
};
export const catchRpcDatabasePromise = (error) => {
  console.log(error);
  if (process.env.NODE_ENV === 'dev') {
    console.log(error);
  }
  throw new NotAcceptableException(
    'Không thể lưu dữ liệu. Vui lòng kiểm tra lại thông tin.',
  );
};
