import { Module } from '@nestjs/common';
import { AppGatewayController } from './app-gateway.controller';
import { AppGatewayService } from './app-gateway.service';

@Module({
  imports: [],
  controllers: [AppGatewayController],
  providers: [AppGatewayService],
})
export class AppGatewayModule {}
