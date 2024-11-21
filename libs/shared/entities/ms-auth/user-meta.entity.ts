import { BaseIdentityMetaEntity } from "libs/shared/base/base-identity-meta.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("UserMeta")
export class UserMeta extends BaseIdentityMetaEntity {
	@ManyToOne(() => User, (user) => user.metadata, {
		onDelete: 'CASCADE',
		orphanedRowAction: "delete"
	})
	@JoinColumn({
		name: "UserId",
		referencedColumnName: "id",
	})
	owner: User;
}
