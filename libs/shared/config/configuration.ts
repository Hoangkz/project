import { Permission } from '../entities/ms-auth/permission.entity';
import { Role } from '../entities/ms-auth/role.entity';
import { UserAccessLog } from '../entities/ms-auth/user-access-log.entity';
import { UserResource } from '../entities/ms-auth/user-resource.entity';
import { User } from '../entities/ms-auth/user.entity';
import { NotificationTemplate } from '../entities/ms-notification/notification-template.entity';
import { Notification } from '../entities/ms-notification/notification.entity';
import { OrganizationMeta } from '../entities/ms-organization/organization-meta.entity';
import { Organization } from '../entities/ms-organization/organization.entity';
import { BucketMeta } from '../entities/ms-storage/bucket-meta.entity.ts';
import { Bucket } from '../entities/ms-storage/bucket.entity';
import { FileItemMeta } from '../entities/ms-storage/file-item-meta.entity';
import { FileItem } from '../entities/ms-storage/file-item.entity';
import {
  getGeneralMicroserviceDbMongoOptions,
  getGeneralMicroserviceDbOptions
} from './config.util';
import { discoveryServicesConfig } from './discovery-service.config';

export enum DATABASE {
  DEFAULT = 'default',
  ORACLE = 'oracle',
}

/* eslint-disable prettier/prettier */
export default () => ({
  port: process.env.PORT || 3002,
  jwtSecret: process.env.APP_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION || 8 * 60 * 60,
  jwtVerifyOptions: {
    secret: process.env.APP_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION || 8 * 60 * 60,
      algorithm: 'HS256',
      issuer: 'MetaApp',
    },
  },

  oracle: {
    name: DATABASE.ORACLE,
    type: 'oracle',
    host: process.env.DB_ORACLE_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_ORACLE_PORT) || 1521,
    username: process.env.DB_ORACLE_USERNAME || 'TTCHIPHITT1',
    password: process.env.DB_ORACLE_PASSWORD || 'admin',
    sid: process.env.DB_ORACLE_SID || 'ORCL',
    database: 'TTCHIPHITT1',
    synchronize: false,
    entities:
      process.env.NODE_ENV === 'dev'
        ? ['dist/data-sync/entities/*.js']
        : ['data-sync/entities/*.js'],
    autoLoadEntities: true,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },

  RABBIT_MQ_URI: process.env.RABBIT_MQ_URI || 'amqp://guest:guest@127.0.0.1',

  MS_AUTH: {
    ...getGeneralMicroserviceDbOptions(process.env.MS_AUTH_DB_NAME),
    entities: [User, Role, UserResource, Permission, UserAccessLog],
  },
  MS_ORGANIZATION: {
    ...getGeneralMicroserviceDbOptions(process.env.MS_ORGANIZATION_DB_NAME),
    entities: [Organization, OrganizationMeta],
  },
 
  MS_STORAGE: {
    ...getGeneralMicroserviceDbOptions(process.env.MS_STORAGE_DB_NAME),
    entities: [Bucket, FileItem, BucketMeta, FileItemMeta],
  },

  MS_NOTIFICATION: {
    ...getGeneralMicroserviceDbOptions(process.env.MS_NOTIFICATION_DB_NAME),
    entities: [Notification, NotificationTemplate],
  },

  rmqConfigs: process.env.NODE_ENV === 'dev' ? discoveryServicesConfig() : {},

  fileStoreDirectory: process.env.FILE_STORE_DIRECTORY || 'buckets',
  uploadFolder: process.env.UPLOAD_FOLDER || 'uploads',
  maxFileSize: '2147483648',
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
