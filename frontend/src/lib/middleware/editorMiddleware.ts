import { getAllImages, getImageURL, updateImage } from "$lib/api/imageServerAPI";
import { getAllVideos, getVideoURL, updateVideo } from "$lib/api/videoServerAPI";
import type { ImageRecord } from "$lib/types/imageTypes";
import { imageRecordToMediaRecord, mediaRecordToImageRecord, mediaRecordToVideoRecord, MediaType, videoRecordToMediaRecord, type MediaRecord } from "$lib/types/mediaTypes";
import type { VideoRecord } from "$lib/types/videoTypes";

export const getAllMediaRecords = async (): Promise<MediaRecord[]> => {
    const images = await getAllImages();
    const videos = await getAllVideos();

    const mediaRecords: MediaRecord[] = new Array(images.length + videos.length);
    
    images.forEach((element) => {
        mediaRecords[element.index] = {
            url: getImageURL(element),
            index: element.index,
            duration: element.duration,
            type: MediaType.IMAGE,
            raw: element
        } satisfies MediaRecord;
    });

    videos.forEach((element) => {
        mediaRecords[element.index] = {
            url: getVideoURL(element),
            index: element.index,
            duration: 0,
            type: MediaType.VIDEO,
            raw: element
        } satisfies MediaRecord;
    });

    return mediaRecords
}

export const updateAllMediaRecords = async (media: MediaRecord[]): Promise<MediaRecord[]> => {
    const returnList: MediaRecord[] = new Array(media.length);

    for (let index = 0; index < media.length; index++) {
        const element = media[index];
        switch (element.type) {
            case MediaType.IMAGE: {
                const response = await updateImage(mediaRecordToImageRecord(element));
                returnList[index] = imageRecordToMediaRecord(response);
                break;
            }
            case MediaType.VIDEO: {
                const response = await updateVideo(mediaRecordToVideoRecord(element));
                returnList[index] = videoRecordToMediaRecord(response);
                break;
            }
        }
    }
    
    return returnList;
}

//Fix Indices automatically

export const fixMediaIndices = async () => {
    const images = await getAllImages();
    const videos = await getAllVideos();

    const mediaRecords: MediaRecord[] = new Array(images.length + videos.length);

    let indexCounter = 0;
    for (let i = 0; i < mediaRecords.length; i++) {
        let checkStatus = true;
        while (checkStatus) {
            const check = checkForIndexInMedia(indexCounter, images, videos);
            if (check[0]) {
                mediaRecords[i] = check[1]!!;
                checkStatus = false;
            }

            indexCounter++;
        }
    }
}

const checkForIndexInMedia = (index: number, images: ImageRecord[], videos: VideoRecord[]): [boolean, MediaRecord | undefined] => {
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        if (element.index == index) return [true, imageRecordToMediaRecord(element)];
    }

    for (let i = 0; i < videos.length; i++) {
        const element = videos[i];
        if (element.index == index) return [true, videoRecordToMediaRecord(element)];
    }

    throw new Error("Nothing was found");
}
