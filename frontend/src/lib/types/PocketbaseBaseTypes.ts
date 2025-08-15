export type RecordResponse = {
    collectionId: string,
    collectionName: string,
    id: string,
    created: string,
    updated: string
}

export type RecordNotFoundResponse = {
    status: number,
    message: string,
    data: Object
}
