import { Organization } from "libs/shared/entities/ms-organization/organization.entity";

export class OrganizationUpdatedEvent {
    constructor(public readonly organization:Organization){

    }
}