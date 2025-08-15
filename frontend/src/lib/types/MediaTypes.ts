import type { RecordResponse } from "./PocketbaseBaseTypes"

export enum MediaType {
    IMAGE, VIDEO
}

export type MediaRecord = MediaData & RecordResponse;

export type MediaData = {
    content: string,
    duration: number,
    index: number,
    type: string,
    name: string
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
    name: string
}

export type MediaCreateData = {
    content: File,
    duration: number,
    index: number,
    type: string,
    name: string
}
