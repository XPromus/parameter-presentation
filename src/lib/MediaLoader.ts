import mediaConfig from "$lib/config/mediaConfig.json";

export enum ContentType {
    IMAGE, VIDEO
}

export type MediaConfig = {
    basePath: string,
    media: MediaData[]
}

export type MediaData = {
    index: number,
    type: string,
    filename: string,
    duration: number
}

export const GetAllMedia = (): MediaData[] => {
    return mediaConfig.media;
}

export const GetMediaDataAtIndex = (index: number): MediaData => {
    for (let i = 0; i < mediaConfig.media.length; i++){
        if (mediaConfig.media[i].index == index){
            return mediaConfig.media[i];
        }
    }

    throw new Error(`Media with index ${index} could not be found`);
}

export const GetMediaPath = (media: MediaData) => {
    return `${mediaConfig.basePath}${media.type}s/${media.filename}`;
}
