
import { BaseIdentityMetaEntity } from "libs/shared/base/base-identity-meta.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Organization } from "./organization.entity";

@Entity("OrganizationMeta")
// @Unique(["owner", "metaKey"])
export class OrganizationMeta extends BaseIdentityMetaEntity {
	@ManyToOne(() => Organization, (org) => org.metadata, {
		orphanedRowAction: 'delete'
	})
	@JoinColumn({
		name: "OrganizationId",
		referencedColumnName: "id",
	})
	owner: Organization;
}
