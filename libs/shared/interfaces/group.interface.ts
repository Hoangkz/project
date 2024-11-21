import { IBaseEntity } from "./base-entity";
import { ILocationUnit } from "./location-unit.interface";

export interface IGroup extends IBaseEntity{
    name: string;
    code: string;
    erpName: string;
    erpId: string;
    location: ILocationUnit;
}

export interface IOrganization extends IGroup {

}

export interface IPartner extends IGroup {

}