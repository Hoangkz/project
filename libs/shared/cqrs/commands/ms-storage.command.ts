export enum MsStorageCommand {
    CreateBucket = "CreateBucket",
    UpdateBucket = "UpdateBucket",
    DeleteBucket = "DeleteBucket",
    DeleteBuckets = "DeleteBuckets",

    UpdateFileItem = "UpdateFileItem",
    DeleteFileItem = "DeleteFileItem",
    DeleteFileItems = "DeleteFileItems",

    RenameBucket = 'RenameBucket',
    MoveBucket = 'MoveBucket',
    RenameFileItem = 'RenameFileItem',
    MoveFileItem = 'MoveFileItem',
    EmptyTrash = 'EmptyTrash',
    CreateFileItem = 'CreateFileItem',
    CreateFileItems = 'CreateFileItems',
}