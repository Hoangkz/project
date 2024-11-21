import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import configuration from '../config/configuration';

import { RmqService } from './rmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: (process.env.NODE_ENV || 'dev') + '.env',
    }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register(...names: string[]): DynamicModule {
    const module = {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync(
          names.map((name) => {
            return {
              name,
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                const _urls = configService.get(`rmqConfigs.${name}`)
                  ? configService.get(`rmqConfigs.${name}`)
                  : [configService.get<string>('RABBIT_MQ_URI')];
                return {
                  transport: Transport.RMQ,
                  options: {
                    urls: _urls,
                    queue: `RABBIT_MQ_${name}_QUEUE`,
                    persistent: true,
                    queueOptions: {
                      durable: true,
                    },
                    socketOptions: {
                      heartbeatIntervalInSeconds: 5,
                      reconnectTimeInSeconds: 5,
                    },
                  },
                };
              },
            };
          }),
        ),
      ],
      exports: [ClientsModule],
    };

    return module;
  }

  static registerMany(...names: string[]): DynamicModule[] {
    return names.map((name: string) => RmqModule.register(name));
  }
}
