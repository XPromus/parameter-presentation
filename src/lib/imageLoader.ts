import imageJson from "$lib/imageConfig.json";

export type MediaData = {
    basePath: string,
    images: ImageData[],
    videos: VideoData[]
}

export type ImageData = {
    index: number,
    filename: string,
    duration: number
}

export type VideoData = {
    index: number,
    filename: string
}

export const GetImageData = (): MediaData => {
    const data: MediaData = imageJson;
    return data;
}

export const GetImagePaths = (): string[] => {
    const returnArray: string[] = new Array();
    imageJson.images.forEach(element => {
        returnArray.push(imageJson.basePath + element.filename);
    });
    return returnArray;
}
