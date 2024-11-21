import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource, deleteDataSourceByName, getDataSourceByName } from 'typeorm-transactional';
import configuration from '../config/configuration';
import { MapMetadataSubscriber } from '../subscribers/map-metadata.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: 'dev.env',
    }),
  ],
})
export class DatabaseModule {
  static register(name: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          name: name,
          useFactory: (config: ConfigService) => config.get(name),
          dataSourceFactory: async (options) => {
            if(!options){
              throw new Error('Thiếu khai báo Options datasource')
            }
            options = {...options, name}
            deleteDataSourceByName('default')
            return addTransactionalDataSource(getDataSourceByName(name) || new DataSource(options))
          },

          inject: [ConfigService],
        }),
      ],
      providers: [MapMetadataSubscriber]
    };
  }

}
