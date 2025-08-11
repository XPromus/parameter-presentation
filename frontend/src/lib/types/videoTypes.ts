export type VideoListResponse = {
    page: number,
    perPage: number,
    totalPages: number,
    items: VideoRecord[]
}

export type VideoRecord = {
    collectionId: string,
    collectionName: string,
    id: string,
    video: string,
    index: number,
    created: string,
    updated: string
}

export const isVideoRecord = (target: any): target is VideoRecord => {
    return typeof 
        target === "object" && 
        target !== null && 
        "collectionId" in target && 
        "collectionName" in target &&
        "id" in target &&
        "video" in target &&
        "index" in target &&
        "created" in target &&
        "updated" in target;
}

export type VideoRecordNotFound = {
    status: number,
    message: string,
    data: Object
}

export const isVideoRecordNotFound = (target: VideoRecord | VideoRecordNotFound): target is VideoRecordNotFound => {
    return typeof 
        target === "object" && 
        target !== null && 
        "status" in target && 
        "message" in target;
}

export type VideoCreateData = {
    video: File,
    index: number
}

export type VideoUpdateData = {
    index: number
}