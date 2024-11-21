import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LoadEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class MapMetadataSubscriber implements EntitySubscriberInterface {


    afterLoad (entity: any, event?: LoadEvent<any>): void | Promise<any> {
        if(entity.metadata){
            entity.attrs = {}
            entity.metadata.forEach(meta => {
                entity.attrs[meta.metaKey] = meta.metaValue
            })
        }
    }

    beforeInsert (event: InsertEvent<any>): void | Promise<any> {
        this.attrsToMetadata(event)
    }

    beforeUpdate (event: UpdateEvent<any>): void | Promise<any> {
        this.attrsToMetadata(event)
    }

    attrsToMetadata(event: InsertEvent<any> | UpdateEvent<any>){
        const attrs = event.entity.attrs
        if(attrs){
           event.entity.metadata = []
           Object.keys(attrs).forEach(key => {
            event.entity.metadata.push({
                metaKey: key,
                metaValue: attrs[key]
            })
           })
        }
    }
}