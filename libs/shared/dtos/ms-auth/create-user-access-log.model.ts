export class CreateUserAccessLogModel {
    loginName: string;
    success: boolean;
    description?: string;
    ip: string;
    device?: string;
}