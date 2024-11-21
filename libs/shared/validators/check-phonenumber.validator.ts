import { Injectable } from "@nestjs/common";
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isPhoneNumberAlreadyExist", async: true })
@Injectable()
export class isPhoneNumberAlreadyExist implements ValidatorConstraintInterface {
	async validate(phoneNumber: string): Promise<boolean> {
		const checkPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
		if (checkPhoneNumber.test(phoneNumber)) {
			return true;
		}
		return null ;
	}

	defaultMessage(): string {
		return "Xin lỗi, số điện thoại chưa đúng định dạng VN";
	}
}
