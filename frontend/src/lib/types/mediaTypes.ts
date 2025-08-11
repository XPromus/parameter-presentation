export enum MediaType {
    IMAGE, VIDEO
}

export type MediaRecord = {
    collectionId: string,
    collectionName: string,
    id: string,
    content: string,
    duration: number,
    index: number,
    type: string,
    created: string,
    updated: string
}

export type MediaRecordNotFound = {
    status: number,
    message: string,
    data: Object
}

export type MediaRecordUpdate = {
    duration: number,
    index: number,
    type: string,
}

export type MediaCreateData = {
    content: File,
    duration: number,
    index: number,
    type: string
}
