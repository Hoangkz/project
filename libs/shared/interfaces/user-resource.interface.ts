import { UserResourceType } from "../entities/ms-auth/user-resource.entity";

export class IUserResource {
    id: string;
    resourceId: string
    name: string;
    resourceType: UserResourceType;
}