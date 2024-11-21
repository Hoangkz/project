import { IntersectionType } from "@nestjs/swagger";
import { BaseSearchModel } from "libs/shared/base/base-pagination.model";
import { FindNotificationsModel } from "./find-notifications.model";

export class SearchNotificationsModel extends IntersectionType(FindNotificationsModel, BaseSearchModel){

}