
export abstract class BaseCreateCommand<T> {
  constructor(public readonly model: T) { }
}

