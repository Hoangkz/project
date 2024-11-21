export abstract class BaseUploadCommand {
  constructor(public readonly file: Express.Multer.File) {}
}

export abstract class BaseImportCommand {
  constructor(public readonly file: Express.Multer.File) {}
}
