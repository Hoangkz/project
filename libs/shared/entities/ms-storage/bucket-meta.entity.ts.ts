import { BaseIdentityMetaEntity } from "libs/shared/base/base-identity-meta.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bucket } from "./bucket.entity";

@Entity('BucketMetaa')
export class BucketMeta extends BaseIdentityMetaEntity {
    @ManyToOne(() => Bucket, bucket => bucket.metadata)
    @JoinColumn({
        name: 'BucketId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_Bucket_Metadata'
    })
    owner: Bucket
}