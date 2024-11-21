import { IntersectionType } from "@nestjs/swagger"
import { BaseSearchModel } from "libs/shared/base/base-pagination.model"
import { FindBucketsModel } from "./find-buckets.model"

export class SearchBucketsModel extends IntersectionType(FindBucketsModel, BaseSearchModel){

}