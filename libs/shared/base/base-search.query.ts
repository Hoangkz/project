export abstract class BaseFindQuery<TModel> {
    constructor(public readonly model:TModel){}
}