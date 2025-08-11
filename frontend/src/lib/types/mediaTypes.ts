import { getImageURL } from "$lib/api/imageServerAPI"
import { getVideoURL } from "$lib/api/videoServerAPI"
import type { ImageRecord } from "./imageTypes"
import type { VideoRecord } from "./videoTypes"

export enum MediaType {
    IMAGE, VIDEO
}

export type MediaRecord = {
    url: string,
    index: number,
    duration: number,
    type: MediaType,
    raw: ImageRecord | VideoRecord
}

export const imageRecordToMediaRecord = (target: ImageRecord): MediaRecord => {
    return {
        url: getImageURL(target),
        index: target.index,
        duration: target.duration,
        type: MediaType.IMAGE,
        raw: target
    } satisfies MediaRecord
}

export const mediaRecordToImageRecord = (target: MediaRecord): ImageRecord => {
    if (target.type == MediaType.IMAGE) return target.raw as ImageRecord;

    throw new Error("Supplied target is not of media type image");
}

export const videoRecordToMediaRecord = (target: VideoRecord): MediaRecord => {
    return {
        url: getVideoURL(target),
        index: target.index,
        duration: 0,
        type: MediaType.IMAGE,
        raw: target
    } satisfies MediaRecord
}

export const mediaRecordToVideoRecord = (target: MediaRecord): VideoRecord => {
    if (target.type == MediaType.VIDEO) return target.raw as VideoRecord;

    throw new Error("Supplied target is not of media type video");
}
