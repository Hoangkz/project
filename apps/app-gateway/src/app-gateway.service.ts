import { Injectable } from '@nestjs/common';

@Injectable()
export class AppGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
