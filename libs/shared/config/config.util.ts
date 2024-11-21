import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export function getGeneralMicroserviceDbOptions(dataSource: string) {

  return {
    type: process.env.MS_DB_TYPE as any,
    host: process.env.MS_DB_HOST,
    port: parseInt(process.env.MS_DB_PORT),
    username: process.env.MS_DB_USERNAME,
    password: process.env.MS_DB_PASSWORD,
    synchronize: true, //process.env.NODE_ENV === 'dev',
    database: dataSource,
    autoLoadEntities: true,
    extra: {
      trustServerCertificate: true,
    },
    // cache: {
    //   type: 'redis',
    //   duration: 600000,
    //   ignoreErrors: true,
    //   options: {
    //     host: process.env.REDIS_HOST,
    //     port: process.env.REDIS_PORT
    //   }
    // }
    // logging: true,
  };
}

export function getGeneralMicroserviceDbMongoOptions(
  dataSource: string,
): MongoConnectionOptions {
  const rs: MongoConnectionOptions =
    process.env.MS_DB_MONGO_HOST === '127.0.0.1'
      ? {
        type: 'mongodb',
        host: process.env.MS_DB_MONGO_HOST,
        port: parseInt(process.env.MS_DB_MONGO_PORT),
        database: dataSource,
        authSource: 'admin',
        synchronize: true,
        ssl: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
      : {
        type: 'mongodb',
        host: process.env.MS_DB_MONGO_HOST,
        username: process.env.MS_DB_MONGO_USERNAME,
        password: process.env.MS_DB_MONGO_PASSWORD,
        port: parseInt(process.env.MS_DB_MONGO_PORT),
        database: dataSource,
        authSource: 'admin',
        synchronize: true,
        ssl: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
  return rs;
}
