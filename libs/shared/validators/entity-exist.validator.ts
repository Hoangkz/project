import { Injectable } from "@nestjs/common";
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { EntityManager, ObjectType } from "typeorm";
import { BaseIdentityEntity } from "../base/base-identity.entity";

@ValidatorConstraint({
	name: "EntityExist",
	async: true,
})
@Injectable()
export class EntityExistContraint implements ValidatorConstraintInterface {
	constructor(private readonly manager: EntityManager) {}

	async validate(
		value: any,
		validationArgs?: ValidationArguments,
	): Promise<boolean> {
		try {
			const [entityClass, property] = validationArgs.constraints;
			if (!value || !entityClass) {
				return false;
			}

			const entity = await this.manager.findOneBy(entityClass, {
				[property]: value,
			});
			if (entity === null) {
				return false;
			}

			return true;
		} catch (error) {
			return false;
		}
	}

	defaultMessage(args?: ValidationArguments): string {
		return `Không tìm thấy bản ghi có ${args.property} = ${args.value}`;
	}
}

export function EntityExist<T extends BaseIdentityEntity>(
	entityClass: ObjectType<T>,
	property: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [entityClass, property],
			validator: EntityExistContraint,
		});
	};
}
