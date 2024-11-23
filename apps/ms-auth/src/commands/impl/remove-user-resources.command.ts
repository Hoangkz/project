export class RemoveUserResourcesCommand {
  constructor(
    public readonly userId: string,
    public readonly resourceIds: string[],
  ) {}
}
