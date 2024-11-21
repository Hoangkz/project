import { Injectable } from "@nestjs/common";
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator";
import { EntityManager, Equal, ObjectType } from "typeorm";
import { BaseIdentityEntity } from "../base/base-identity.entity";
import { IBaseIdentityEntity } from "../base/base-identity.interface";

export type SameUniqueOptions = {
	entityClass: ObjectType<IBaseIdentityEntity>;
	uniqueWithProperties: string[];
};

@ValidatorConstraint({
	name: "SameUnique",
	async: true,
})
@Injectable()
export class SameUniqueContraint implements ValidatorConstraintInterface {
	constructor(private readonly manager: EntityManager) {}

	async validate(
		value: any,
		validationArgs?: ValidationArguments,
	): Promise<boolean> {
		try {
			const [options] = validationArgs.constraints;
			const { entityClass, uniqueWithProperties } = options;
			if (!value || !entityClass) {
				return true;
			}

			const entity = await this.manager.findOneBy(
				entityClass,
				uniqueWithProperties.map((attr) => {
					return {
						[attr]: Equal(value),
					};
				}),
			);
			if (entity) {
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
	options: SameUniqueOptions,
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [options],
			validator: SameUniqueContraint,
		});
	};
}
