import { BaseIdentityMetaEntity } from "libs/shared/base/base-identity-meta.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { FileItem } from "./file-item.entity";

@Entity('FileItemMeta')
export class FileItemMeta extends BaseIdentityMetaEntity {
    @ManyToOne(() => FileItem, file => file.metadata)
    @JoinColumn({
        name: 'FileId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_FileItem_Metadata'
    })
    owner: FileItem
}