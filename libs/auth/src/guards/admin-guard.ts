import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.isActived && user.isAdmin) {
      return true;
    }
    throw new UnauthorizedException(
      'Tính năng này chỉ áp dụng cho tài khoản Quản trị viên.',
    );
  }
}
