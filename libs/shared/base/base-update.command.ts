export abstract class BaseUpdateCommand<T> {
  constructor(public readonly id: string, public readonly model: T) {}
}
