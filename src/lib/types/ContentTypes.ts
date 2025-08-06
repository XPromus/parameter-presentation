export type ImageViewData = {
    index: number,
    path: string,
    duration: number,
};

export type VideoData = {
    index: number,
    path: string
};

export type ContentList = {
    images: ImageViewData[],
    videos: VideoData[]
}

export enum ContentType {
    IMAGE, VIDEO
}
