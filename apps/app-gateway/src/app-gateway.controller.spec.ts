import { Test, TestingModule } from '@nestjs/testing';
import { AppGatewayController } from './app-gateway.controller';
import { AppGatewayService } from './app-gateway.service';

describe('AppGatewayController', () => {
  let appGatewayController: AppGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppGatewayController],
      providers: [AppGatewayService],
    }).compile();

    appGatewayController = app.get<AppGatewayController>(AppGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
