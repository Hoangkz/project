import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'checkToDate', async: true })
@Injectable()
export class checkToDate implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return true;
    const { object } = validationArguments;
    const from = new Date(object[validationArguments.constraints[0]]);
    const to = new Date(value);
    return to.getTime() > from.getTime();
  }

  defaultMessage(): string {
    return 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
  }
}
