import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { setup } from './setup';
import { AppGatewayModule } from './app-gateway.module';

// dotenv.config({
//   path: process.env.NODE_ENV ? process.env.NODE_ENV + '.env' : 'dev.env',
// });
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppGatewayModule);
  setup(app);
  const config = new DocumentBuilder()
    .setTitle('Phần mềm quản lý Project')
    .setDescription('Phần mềm quản lý Project')
    .setVersion('1.1')
    .addTag('VMS Project')
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_GATEWAY_PORT, () => {
    console.log(
      'API running on port ' + process.env.APP_GATEWAY_PORT,
    );
  });
}
bootstrap();
