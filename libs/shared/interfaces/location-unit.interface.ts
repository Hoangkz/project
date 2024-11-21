import { IBaseEntity } from "./base-entity";

export interface ILocationUnit extends IBaseEntity {
    shortName: string;
    fullName: string;
    code: string;
}