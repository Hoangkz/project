import { Organization } from "libs/shared/entities/ms-organization/organization.entity";

export class OrganizationCreatedEvent {
    constructor(public readonly organization:Organization){

    }
}