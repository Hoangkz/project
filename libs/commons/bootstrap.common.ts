import { NestFactory } from "@nestjs/core";
import { AllExceptionsFilter } from "libs/shared/exceptions/all-ms-exceptions.filter";
import { RmqService } from "libs/shared/rmq/rmq.service";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

export async function bootstrapService(MsModule: any, serviceName: string) {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    const app = await NestFactory.create(MsModule);
    app.useGlobalFilters(new AllExceptionsFilter())
    const rmqService = app.get<RmqService>(RmqService);
    await app.connectMicroservice(rmqService.getOptions(serviceName));
    await app.init();
    await app.startAllMicroservices();
    console.log(`<-----------------${serviceName} STARTED ---------------->`);
}