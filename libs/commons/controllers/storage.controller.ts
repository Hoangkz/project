import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Header,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MsStorageCommand } from 'libs/shared/cqrs/commands/ms-storage.command';
import { MsStorageQuery } from 'libs/shared/cqrs/query/ms-storage.query';
import { CreateBucketModel } from 'libs/shared/dtos/ms-storage/models/create-bucket.model';
import { MoveFileStoreModel } from 'libs/shared/dtos/ms-storage/models/move-file-store.model';
import { RenameFileStoreModel } from 'libs/shared/dtos/ms-storage/models/rename-file-store.model';
import { QueryBucketResult } from 'libs/shared/dtos/ms-storage/results/query-bucket.result';
import FileStoreInterceptor from 'libs/shared/interceptors/file-store.interceptor';
import FileStoresInterceptor from 'libs/shared/interceptors/file-stores.interceptor';
import { TransformResponseInterceptor } from 'libs/shared/interceptors/transform-dto.interceptor';
import { MS_STORAGE } from 'libs/shared/services';
import { lastValueFrom } from 'rxjs';
import contentDisposition from 'content-disposition';
import { Response } from 'express';
import * as fs from 'fs';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { FileItem } from 'libs/shared/entities/ms-storage/file-item.entity';
import { FindFileItemsModel } from 'libs/shared/dtos/ms-storage/models/find-file-items.model';
import { QueryFileItemResult } from 'libs/shared/dtos/ms-storage/results/query-file-item.result';
import { SearchFileItemModel } from 'libs/shared/dtos/ms-storage/models/search-file-items.model';
import { ApiPaginationResult } from 'libs/shared/decorators/api/api-pagination-result.decorator';

type File = {
  filePath: any;
  fileItem: any;
};
@Controller('storage')
// @AllowAuth()
export class StorageController {
  constructor(
    @Inject(MS_STORAGE) private readonly bucketService: ClientProxy,
  ) {}

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Get('/root')
  @ApiResponse({
    type: QueryBucketResult,
    isArray: true,
  })
  async getRoot() {
    return lastValueFrom(this.bucketService.send(MsStorageQuery.GetRoot, {}));
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Get('/explore')
  @ApiQuery({
    name: 'path',
    required: false,
  })
  async explore(@Query('path', new DefaultValuePipe('ROOT')) path?: string) {
    return lastValueFrom(
      this.bucketService.send(MsStorageQuery.ExploreByPath, path),
    );
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Post('/create-bucket')
  @ApiBody({
    type: CreateBucketModel,
    required: true,
  })
  async createBucket(@Body() model: CreateBucketModel) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.CreateBucket, model),
    );
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Post('/rename-bucket/:id')
  @ApiBody({
    type: RenameFileStoreModel,
    required: true,
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async renameBucket(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: RenameFileStoreModel,
  ) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.RenameBucket, {
        id,
        model,
      }),
    );
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Post('/move-bucket/:id')
  @ApiBody({
    type: MoveFileStoreModel,
    required: true,
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async moveBucket(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: MoveFileStoreModel,
  ) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.MoveBucket, { id, model }),
    );
  }

  @Post('/delete-bucket/:id')
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async deleteBucket(@Param('id', ParseUUIDPipe) id: string) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.DeleteBucket, id),
    );
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Post('/rename-file/:id')
  @ApiBody({
    type: RenameFileStoreModel,
    required: true,
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async renameFileItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: RenameFileStoreModel,
  ) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.RenameFileItem, {
        id,
        model,
      }),
    );
  }

  @UseInterceptors(TransformResponseInterceptor<QueryBucketResult>)
  @Post('/move-file/:id')
  @ApiBody({
    type: MoveFileStoreModel,
    required: true,
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async moveFileItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: MoveFileStoreModel,
  ) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.MoveFileItem, {
        id,
        model,
      }),
    );
  }

  @Post('/delete-file/:id')
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
  })
  async deleteFileItem(@Param('id', ParseUUIDPipe) id: string) {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.DeleteFileItem, id),
    );
  }

  @Post('/emptyTrash')
  async emptyTrash() {
    return lastValueFrom(
      this.bucketService.send(MsStorageCommand.EmptyTrash, {}),
    );
  }

  @Post('/upload-file/:bucketId')
  @UseInterceptors(
    FileStoreInterceptor({
      fieldName: 'file',
    }),
  )
  @ApiParam({
    type: String,
    name: 'bucketId',
    required: true,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return lastValueFrom(
      this.bucketService.send(
        MsStorageQuery.GetFileItemById,
        file.filename.split('.')[0],
      ),
    );
  }

  @Post('/upload-files/:bucketId')
  @UseInterceptors(
    FileStoresInterceptor({
      fieldName: 'files',
      maxCount: 10,
    }),
  )
  @ApiParam({
    type: String,
    name: 'bucketId',
    required: true,
  })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const ids = files.map((file) => {
      return file.filename.split('.')[0];
    });
    return lastValueFrom(
      this.bucketService.send(MsStorageQuery.GetFileItemById, ids[0]),
    );
  }

  @Get('/download')
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
  })
  async downloadFile(
    @Query('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const file = await lastValueFrom(
      this.bucketService
        .send(MsStorageQuery.DownloadFileById, id)
        .pipe(catchRpcException()),
    );
    (res as any).set({
      'Content-Length': fs.statSync(file.filePath).size,
      'Content-Type': file.fileItem.contentType,
      'Content-Disposition': contentDisposition(
        `${file.fileItem.name}${file.fileItem.extension}`,
      ),
    });
    fs.createReadStream(file.filePath).pipe(res as any);
  }

  @Get('/file')
  @ApiQuery({
    name: 'filePath',
    type: String,
    required: true,
  })
  async downloadFileByPath(
    @Query('filePath') filePath: string,
    @Res() res: Response,
  ) {
    //await this.bucketService.downloadFileByPath(filePath, res);
  }

  @Get('/downloadAll/:bucketId')
  @ApiParam({
    name: 'bucketId',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'includesSubBucket',
    type: Boolean,
    required: false,
  })
  @Header('Content-Type', 'application/zip')
  async downloadBucket(
    @Res({ passthrough: true }) res: Response,
    @Param('bucketId', ParseUUIDPipe) bucketId: string,
    @Query('includesSubBucket', new DefaultValuePipe(false))
    includesSubBucket: boolean,
  ) {
    //await this.bucketService.downloadBucket(res, bucketId, includesSubBucket);
  }

  @Get('/get-files-by-bucket/:bucketId')
  @ApiParam({
    name: 'bucketId',
    type: String,
    required: true,
  })
  async searchFilesByBucket(
    @Param('bucketId', ParseUUIDPipe) bucketId: string,
  ) {
    //return await this.bucketService.getFilesByBucket(bucketId);
  }

  @Get('get-file-by-id/:id')
  async getFileById(@Query('id', ParseUUIDPipe) fileId: string) {
    console.log(fileId);
    //return await this.bucketService.getFile(fileId);
  }

  @Post(MsStorageQuery.FindFileItems)
  @ApiBody({
    type: FindFileItemsModel,
    required: true,
  })
  @ApiResponse({
    type: [QueryFileItemResult],
  })
  async findFileItems(@Body() model: FindFileItemsModel) {
    return lastValueFrom(
      this.bucketService.send(MsStorageQuery.FindFileItems, model),
    );
  }

  @Post(MsStorageQuery.SearchFileItems)
  @ApiBody({
    type: SearchFileItemModel,
    required: true,
  })
  @ApiPaginationResult(QueryFileItemResult)
  async SearchFileItems(@Body() model: SearchFileItemModel) {
    return lastValueFrom(
      this.bucketService.send(MsStorageQuery.SearchFileItems, model),
    );
  }
}
