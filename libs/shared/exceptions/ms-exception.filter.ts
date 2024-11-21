import { InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export function catchMsException(error: any){
    if(!error){
        throw new RpcException(new InternalServerErrorException("Lỗi dịch vụ", "Lỗi dịch vụ không xác định"))
    }
    if(error.statusCode){
        throw new RpcException(error)
    }
    throw new RpcException(new InternalServerErrorException(error))
}