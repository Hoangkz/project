import { IEvent, IEventPublisher, IMessageSource } from "@nestjs/cqrs";
import { Subject } from "rxjs";

export class EventStore implements IEventPublisher, IMessageSource {
  subject$: Subject<any>;
  constructor(

  ) {}
  bridgeEventsTo<T extends IEvent>(subject$: Subject<T>) {
    this.subject$ = subject$;
  }

  publish(event: any) {
    this.subject$.next(event);
  }
}
