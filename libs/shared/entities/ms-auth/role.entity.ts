import { BaseIdentityEntity } from "libs/shared/base/base-identity.entity";
import { UserGroupType } from "libs/shared/constants/user-group.type";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity("Role")
export class Role extends BaseIdentityEntity {
    @Column("nvarchar", {
		length: 50,
		nullable: false,
		name: "Name",
		unique: true
	})
	/** Tên vai trò, mặc định hệ thống gồm: admin, manager, user, Các phòng ban và đối tác tự động sinh 2 vai trò manager và user */
	name: string;

	@Column("ntext", {
		nullable: true,
		name: "Description",
	})
	/**Mô tả về vai trò */
	description?: string;

	@Column("simple-enum", {
		enum: UserGroupType,
		enumName: "UserGroupType",
		nullable: false,
		name: "UserGroup",
		default: UserGroupType.ORGANIZATION
	})
	userGroup: UserGroupType

	@ManyToMany(() => Permission, (permission) => permission.roles, {
		eager: true,
		cascade: true
		// onUpdate: 'CASCADE',
		// onDelete: 'CASCADE'
	})
	@JoinTable({
		name: "Role_Permission",
		joinColumn: {
			name: "RoleId",
			referencedColumnName: 'id',
			foreignKeyConstraintName: "FK_Role_Permission",
		},
		inverseJoinColumn: {
			name: "PermissionId",
			referencedColumnName: 'id',
			foreignKeyConstraintName: "FK_Permission_Role",
		},
	})
	permissions: Permission[];

	@ManyToMany(() => User, (user) => user.roles)
	users: User[];

}