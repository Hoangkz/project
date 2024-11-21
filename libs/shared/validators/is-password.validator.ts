import { ValidationOptions } from "class-validator";

export class PasswordValidationOptions {
	minLength?: number = 8;
	maxLength?: number = 32;
	uppercaseRequired?: boolean = false;
	lowercaseRequired?: boolean = false;
	symbolRequired?: boolean = false;
	allowedSymbol?: string = undefined;
}

export function IsPassword(
	passwordOptions: PasswordValidationOptions,
	validationOptions: ValidationOptions,
) {
	return true;
}
