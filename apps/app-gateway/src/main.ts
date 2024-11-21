import { NestFactory } from '@nestjs/core';
import { AppGatewayModule } from './app-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(AppGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
