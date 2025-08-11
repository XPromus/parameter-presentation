export type ImageListResponse = {
    page: number,
    perPage: number,
    totalPages: number,
    items: ImageRecord[]
}

export type ImageRecord = {
    collectionId: string,
    collectionName: string,
    id: string,
    image: string,
    duration: number,
    index: number,
    created: string,
    updated: string
}

export const isImageRecord = (target: any): target is ImageRecord => {
    return typeof 
        target === "object" && 
        target !== null && 
        "collectionId" in target && 
        "collectionName" in target &&
        "id" in target &&
        "image" in target &&
        "duration" in target &&
        "index" in target &&
        "created" in target &&
        "updated" in target;
}

export type ImageRecordNotFound = {
    status: number,
    message: string,
    data: Object
}

export const isImageRecordNotFound = (target: ImageRecord | ImageRecordNotFound): target is ImageRecordNotFound => {
    return typeof 
        target === "object" && 
        target !== null && 
        "status" in target && 
        "message" in target;
}

export type ImageCreateData = {
    image: File,
    duration: number,
    index: number
}

export type ImageUpdateData = {
    duration: number,
    index: number,
}
