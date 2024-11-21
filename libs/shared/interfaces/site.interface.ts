import { IOrganization } from "./group.interface";
import { ILocationUnit } from "./location-unit.interface";

export interface ISite {
    organization: IOrganization;

    locationUnit: ILocationUnit;

    erpName: string;

    erpId: string;
}