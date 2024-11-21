import { DocumentCaseStatus } from "../constants/document-case-status.enum";

interface IDocumentCase {
    status: DocumentCaseStatus
}

export function canSaveDocumentCase(entity: IDocumentCase) {
    return  !entity.status || entity.status === DocumentCaseStatus.DRAFT || entity.status === DocumentCaseStatus.UPDATING
}

export function canRequestApproveDocumentCase(entity: IDocumentCase) {
    return entity.status === DocumentCaseStatus.DRAFT || entity.status === DocumentCaseStatus.UPDATING
}

export function canApproveDocumentCase(entity: IDocumentCase) {
    return entity.status === DocumentCaseStatus.APPROVING
}
export function canRejectDocumentCase(entity: IDocumentCase) {
    return entity.status === DocumentCaseStatus.APPROVING
}

export function canRollbackDocumentCase(entity: IDocumentCase) {
    return entity.status === DocumentCaseStatus.APPROVED
}