import { BaseIdentityEntity } from "libs/shared/base/base-identity.entity";
import { Column, Entity } from "typeorm";

@Entity("UserAccessLog")
export class UserAccessLog extends BaseIdentityEntity {
    @Column('nvarchar', {
        name: 'LoginName',
        nullable: false
    })
    loginName: string;

    @Column('varchar', {
        name: 'Ip',
        nullable: false,
    })
    ip: string;

    @Column('nvarchar', {
        name: 'device',
        nullable: true
    })
    device?: string;

    @Column('bit', {
        nullable: false,
        name: 'Success',
    })
    success: Boolean;

    @Column('ntext', {
        nullable: true,
        name: 'Description'
    })
    description?: string
}