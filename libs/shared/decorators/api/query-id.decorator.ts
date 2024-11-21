import { Param, ParseUUIDPipe, PipeTransform, Query, Type } from "@nestjs/common";

export const QueryId = (...pipes: (Type<PipeTransform> | PipeTransform)[]) => Query('id', ParseUUIDPipe, ...pipes)
export const ParamId = (...pipes: (Type<PipeTransform> | PipeTransform)[]) => Param('id', ParseUUIDPipe, ...pipes)