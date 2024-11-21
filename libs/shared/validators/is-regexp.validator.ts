import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraintInterface,
} from "class-validator";

export class ValidRegExpContraint implements ValidatorConstraintInterface {
	validate(
		value: any,
		validationArguments?: ValidationArguments,
	): boolean | Promise<boolean> {
		const [expTarget] = validationArguments.constraints;
		let exp: RegExp;
		if (typeof expTarget === "string") {
			exp = new RegExp(expTarget);
		} else {
			exp = expTarget;
		}
		return exp.test(value);
	}
	defaultMessage?(validationArguments?: ValidationArguments): string {
		return validationArguments.targetName + "  không đúng định dạng";
	}
}

export function IsValidRegExp(
	expTarget: string | RegExp,
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [expTarget],
			validator: ValidRegExpContraint,
		});
	};
}
