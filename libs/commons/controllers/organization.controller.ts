import {
  Body,
  Controller,
  Get,
  Inject,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AllowAuth } from 'libs/auth/src/decorators/allow-auth.decorator';
import { HasResources } from 'libs/auth/src/decorators/has-resources.decorator';
import { JwtAuthGuard } from 'libs/auth/src/guards/jwt-auth.guard';
import { ExtraPaginationResult } from 'libs/shared/base/pagination.result';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { MsOrganizationQuery } from 'libs/shared/cqrs/query/ms-organization.query';
import { ApiQueryId } from 'libs/shared/decorators/api/api-query-id.decorator';
import { RequestAuthUser } from 'libs/shared/decorators/auth-user.decorator';
import { FindOrganizationsModel } from 'libs/shared/dtos/ms-organization/find-organizations.model';
import { OrganizationResult } from 'libs/shared/dtos/ms-organization/organization.result';
import { SearchOrganizationModel } from 'libs/shared/dtos/ms-organization/search-organization.model';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { MS_ORGANIZATION } from 'libs/shared/services';
import { lastValueFrom } from 'rxjs';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('/organization')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(
    @Inject(MS_ORGANIZATION) protected readonly msOrganization: ClientProxy,
  ) {}

  @Get('/get-by-id')
  @ApiQueryId()
  @AllowAuth()
  @ApiResponse({
    type: OrganizationResult,
  })
  async getById(@Query('id', ParseUUIDPipe) id: string) {
    return this.msOrganization.send(MsOrganizationQuery.GetById, id);
  }

  @Get(MsOrganizationQuery.GetOrganizationsDescendantById)
  @AllowAuth()
  @ApiQuery({
    name: 'id',
    type: UUID,
    required: true,
  })
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  getOrganizationDescendantById(@Query('id', ParseUUIDPipe) id: string) {
    return this.msOrganization.send(
      MsOrganizationQuery.GetOrganizationsDescendantById,
      id,
    );
  }

  @Get('/get-by-code')
  @ApiQuery({
    name: 'code',
    type: String,
    required: true,
  })
  @ApiResponse({
    type: OrganizationResult,
  })
  @AllowAuth()
  getByCode(@Query('code') code: string) {
    return this.msOrganization.send(MsOrganizationQuery.GetByCode, code);
  }

  @Get('/get-root-tree')
  @AllowAuth()
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  getRootTree() {
    return this.msOrganization.send(
      MsOrganizationQuery.GetOrganizationRootTree,
      {},
    );
  }

  @Get(MsOrganizationQuery.GetOrganizationTelecommunicationsTeams)
  @AllowAuth()
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  @ApiQuery({
    name: 'id',
    type: UUID,
    required: true,
  })
  getOrganizationTelecommunicationsTeams(
    @Query('id', ParseUUIDPipe) id: string,
  ) {
    return this.msOrganization.send(
      MsOrganizationQuery.GetOrganizationTelecommunicationsTeams,
      id,
    );
  }

  @Get('/get-trees')
  @ApiResponse({
    type: OrganizationResult,
  })
  getOrgs(@RequestAuthUser() user: User) {
    if (user.isAdmin) {
      return this.msOrganization.send(
        MsOrganizationQuery.GetOrganizationTree,
        '',
      );
    }
    return null;
  }

  @Post('/get-trees-child')
  @HasResources<SearchOrganizationModel>({
    func: ({ query }) => query.id,
  })
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  @ApiQuery({
    name: 'id',
    type: UUID,
    required: true,
  })
  getChildOrgs(@Query('id', ParseUUIDPipe) id: string) {
    return this.msOrganization.send(
      MsOrganizationQuery.GetOrganizationTree,
      id,
    );
  }

  @Post('/GetOwnOrganizations')
  @AllowAuth()
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  async getOwnOrganizations(@RequestAuthUser() user: User) {
    if (user) {
      return lastValueFrom(
        this.msOrganization.send(MsOrganizationQuery.FindOrganizations, {
          ids: user.resources
            .filter((c) => c.resourceType === 'Organization')
            .map((c) => c.resourceId),
        }),
      );
    }
    return [];
  }

  @Post('/FindOrganizations')
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  @ApiBody({
    type: FindOrganizationsModel,
  })
  async findOrganizations(@Body() model: FindOrganizationsModel) {
    return lastValueFrom(
      this.msOrganization.send(MsOrganizationQuery.FindOrganizations, model),
    );
  }

  @Post('/SearchOrganizations')
  @HasResources<SearchOrganizationModel>({
    func: ({ body }) => body.parentId,
  })
  @ApiResponse({
    type: ExtraPaginationResult<OrganizationResult>,
  })
  @ApiBody({
    type: SearchOrganizationModel,
  })
  searchOrganizations(@Body() model: SearchOrganizationModel) {
    return this.msOrganization
      .send(MsOrganizationQuery.SearchOrganizations, model)
      .pipe(catchRpcException());
  }

  //comment tam vi khdt khong dc cap quyen truy cap
  @Post('/FindDescendants')
  // @HasResources({
  //   func: ({ query }) => query.id,
  // })
  @ApiResponse({
    type: OrganizationResult,
    isArray: true,
  })
  @ApiQuery({
    type: String,
    name: 'id',
    required: true,
  })
  findDescendants(@Query('id', ParseUUIDPipe) id: string) {
    return this.msOrganization.send(MsOrganizationQuery.FindDescendants, id);
  }

  @Get('/FindProjectManagementOrganization')
  findProjectManagementOrganization(@RequestAuthUser() user: User) {
    return this.msOrganization.send(
      MsOrganizationQuery.FindProjectManagementOrganization,
      user,
    );
  }
}
