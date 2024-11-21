import { BaseIdentityEntity } from "libs/shared/base/base-identity.entity";
import { Column, Entity } from "typeorm";

@Entity("NotificationTemplate")
export class NotificationTemplate extends BaseIdentityEntity {
	@Column("nvarchar", {
		length: 255,
		nullable: false,
		name: "Name",
	})
	name: string;

	@Column("ntext", {
		nullable: false,
		name: "Content",
	})
	content: string;

	@Column("nvarchar", {
		length: 255,
		nullable: false,
		name: "Subject",
	})
	subject: string;

}
