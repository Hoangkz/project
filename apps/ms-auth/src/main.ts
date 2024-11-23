import { bootstrapService } from 'libs/commons/bootstrap.common';
import { MS_AUTH } from 'libs/shared/services';
import { MsAuthModule } from './ms-auth.module';

bootstrapService(MsAuthModule, MS_AUTH)
