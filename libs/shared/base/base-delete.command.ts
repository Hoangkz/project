export type DeleteParamsType = string | string[];
export abstract class BaseDeleteCommand<T extends DeleteParamsType = string> {
  constructor(public readonly id: T) {}
}
export abstract class BaseDeleteManyCommand {
  constructor(public readonly ids: string[]) {}
}
