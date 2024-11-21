import { Controller, Get } from '@nestjs/common';
import { AppGatewayService } from './app-gateway.service';

@Controller()
export class AppGatewayController {
  constructor(private readonly appGatewayService: AppGatewayService) {}

  @Get()
  getHello(): string {
    return this.appGatewayService.getHello();
  }
}
