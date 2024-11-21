
export interface IRpcResponse<ResponseDataType = any> {
    data?: ResponseDataType
    message?: string;
    statusCode: number;

}

export class RpcResponse<T> implements IRpcResponse<T>{
    data?: T;
    message?: string;
    statusCode: number;
    isRpcResponse: boolean = true;

    constructor(statusCode: number, data?: T, message?: string) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }

    public setStatus(statusCode: number) : RpcResponse<T> {
        this.statusCode = statusCode;
        return this;
    }

    public setMessage(message: string) : RpcResponse<T> {
        this.message = message;
        return this;
    }

    public setData(data: T) : RpcResponse<T> {
        this.data = data;
        return this;
    }

    public static error(statusCode: number, message: string) : RpcResponse<any>{
        return new RpcResponse(statusCode, undefined, message)
    }

    public static success<TData>(data: TData) : RpcResponse<TData> {
        return new RpcResponse(200, data)
    }
}
