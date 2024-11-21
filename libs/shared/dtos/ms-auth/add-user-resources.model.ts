import { ApiProperty } from '@nestjs/swagger';
import { BaseAddUserResourceModel } from './add-user-resource.model';

export class AddUserResourcesModel {
  @ApiProperty({
    name: 'resourceType',
    required: true,
    nullable: false,
  })
  resourceType: string;

  @ApiProperty({
    name: 'resources',
    type: Array<BaseAddUserResourceModel>,
    nullable: true,
    required: false,
  })
  resources?: BaseAddUserResourceModel[];
}
