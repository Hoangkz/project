import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { RmqContext, RpcException } from '@nestjs/microservices';
import { AllExceptionsFilter } from '../exceptions/all-ms-exceptions.filter';
import { RmqService } from '../rmq/rmq.service';

@Controller()
@UseFilters(AllExceptionsFilter)
export class BaseMsController {
  constructor(
    protected readonly rmqService: RmqService,
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
    protected readonly eventBus: EventBus,
    protected readonly publisher: EventPublisher,
  ) { }

  protected async query<IQuery>(ctx: RmqContext, query: IQuery) {
    try {
      this.rmqService.ack(ctx);
      const rs = await this.queryBus.execute(query);
      return rs;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      } else {
        throw new RpcException(error);
      }
    }
  }

  protected async command<ICommand>(ctx: RmqContext, command: ICommand) {
    try {
      this.rmqService.ack(ctx);
      return await this.commandBus.execute(command);
    } catch (error) {
      if (Object.getPrototypeOf(error) === RpcException) {
        throw error;
      } else {
        throw new RpcException(error);
      }
    }
  }
}
