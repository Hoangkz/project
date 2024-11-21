import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AddUserResourceModel } from './add-user-resource.model';

export class SetUserResourcesModel {
  @ApiProperty({
    name: 'resources',
    type: Array<AddUserResourceModel>,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  resources: AddUserResourceModel[];
}
