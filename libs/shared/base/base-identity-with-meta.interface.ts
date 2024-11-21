import { IBaseIdentityMetaEntity } from './base-identity-meta.interface';

export class IBaseIdentityWithMetaEntity<T extends IBaseIdentityMetaEntity> {
  metadata?: T[];
}
