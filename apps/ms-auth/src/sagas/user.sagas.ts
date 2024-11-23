import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";

import { UserGroupType } from "libs/shared/constants/user-group.type";
import { OrganizationDeletedEvent } from "libs/shared/cqrs/events/ms-organization/organization-deleted.event";

import { OrganizationUpdatedEvent } from "libs/shared/cqrs/events/ms-organization/organization-updated.event";
import { mergeMap, Observable } from "rxjs";
import { RemoveUserGroupByGroupIdCommand } from "../commands/impl/remove-user-group-by-group-id.command";
import { RemoveUserResourceByResourceIdCommand } from "../commands/impl/remove-user-resource-by-resource-id.command";
import { UpdateAllUserGroupCommand } from "../commands/impl/update-all-user-group.command";
import { UpdateResourceNameCommand } from "../commands/impl/update-user-resource-name.command";
@Injectable()
export class UserSaga{
    @Saga()
    organizationUpdated = (events: Observable<any>): Observable<ICommand> => {
        return events.pipe(
            ofType(OrganizationUpdatedEvent),
            mergeMap((event) => [
                new UpdateResourceNameCommand({
                    name: event.organization.name,
                    resourceId: event.organization.id
                }),
                new UpdateAllUserGroupCommand(UserGroupType.ORGANIZATION, event.organization)
            ])
        )
    }

    @Saga()
    organizationDeleted = (events: Observable<any>): Observable<ICommand> => {
        return events.pipe(
            ofType(OrganizationDeletedEvent),
            mergeMap((event) => [
                new RemoveUserResourceByResourceIdCommand(event.id),
                new RemoveUserGroupByGroupIdCommand(event.id)
            ])
        )
    }
   
}