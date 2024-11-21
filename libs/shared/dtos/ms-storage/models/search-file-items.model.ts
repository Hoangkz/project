import { IntersectionType } from "@nestjs/swagger";
import { BaseSearchModel } from "libs/shared/base/base-pagination.model";
import { FindFileItemsModel } from "./find-file-items.model";

export class SearchFileItemModel extends IntersectionType(FindFileItemsModel, BaseSearchModel) {

}
