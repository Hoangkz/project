import { isNotEmpty } from "class-validator";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { toAlias } from "../utils/alias.util";

interface IEntityWithAlias {
    name: string;
    alias: string;
}

@EventSubscriber()
export class MapAliasSubscriber<T extends IEntityWithAlias> implements EntitySubscriberInterface<T> {
    constructor(dataSource: DataSource){
        dataSource.subscribers.push(this)
    }

    beforeInsert (event: InsertEvent<T>): void | Promise<any> {
        this.nameToAlias(event)
    }

    beforeUpdate (event: UpdateEvent<T>): void | Promise<any> {
        this.nameToAlias(event)
    }

    nameToAlias(event: InsertEvent<T> | UpdateEvent<any>){
        if(isNotEmpty(event.entity.name)){
            event.entity.alias = toAlias(event.entity.name)
        }
    }
}