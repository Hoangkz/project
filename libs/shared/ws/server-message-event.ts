import { ServerEvent } from './server.event';

export class ServerMessageEvent {
  constructor(
    public readonly eventName: ServerEvent,
    public readonly data: any,
    public readonly userId?: string | string[],
  ) {}
}
