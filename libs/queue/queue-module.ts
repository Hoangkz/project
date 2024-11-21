import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueController } from './queue.controller';

const poolQueues: Set<any> = new Set<any>();

export function getBullBoardQueues(): BaseAdapter[] {
  console.log(this.poolQueues)
  const bullBoardQueues = [...this.poolQueues].reduce(
    (acc: BaseAdapter[], val) => {
      acc.push(new BullAdapter(val));
      return acc;
    },
    [],
  );

  return bullBoardQueues;
}

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        lazyConnect: false,
        offlineQueue: false,
      },
    }),
  ],
  controllers: [QueueController],
})
export class QueueModule {
  static register(name) {
    return {
      module: QueueModule,
      imports: [
        BullModule,
        BullModule.registerQueue({
          name: name,
          defaultJobOptions: {
            delay: 0,
            timeout: 0,
            removeOnComplete: true,
            removeOnFail: true,
          },
        }),
      ],
    };
  }

  static addQueue(queue: Queue<any>) {
    poolQueues.add(queue);
  }
}
