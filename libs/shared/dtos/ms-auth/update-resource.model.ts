import { OmitType } from "@nestjs/swagger";
import { AddUserResourceModel } from "./add-user-resource.model";

export class UpdateResourceModel extends OmitType(AddUserResourceModel, ['resourceType']){}