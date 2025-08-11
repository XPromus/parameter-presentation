import PocketBase from "pocketbase";
import apiConfig from "$lib/config/apiConfig.json";
import type { VideoRecord, VideoRecordNotFound, VideoUpdateData, VideoCreateData } from "$lib/types/videoTypes";

const pb = new PocketBase(apiConfig.baseURL);

export const getVideoURL = (video: VideoRecord): string => {
    return `${apiConfig.baseURL}/api/files/${video.collectionId}/${video.id}/${video.video}`;    
}

export const getAllVideos = async (): Promise<VideoRecord[]> => {
    return await pb.collection(apiConfig.videoCollectionName).getFullList<VideoRecord>({
        sort: "+index"
    });
}

export const getVideoById = async (id: string): Promise<VideoRecord | VideoRecordNotFound> => {
    return await pb.collection(apiConfig.videoCollectionName).getOne(id);
}

export const getVideoByIndex = async (index: number): Promise<VideoRecord | VideoRecordNotFound> => {
    return await pb.collection(apiConfig.videoCollectionName).getFirstListItem<VideoRecord>(
        `index="${index}"`
    );
}

export const updateVideos = async (videos: VideoRecord[]) => {
    for (let index = 0; index < videos.length; index++){
        const element = videos[index];
        const data: VideoUpdateData = {
            index: element.index
        }
        await pb.collection(apiConfig.videoCollectionName).update(element.id, data);
    }
}

export const updateVideo = async (video: VideoRecord): Promise<VideoRecord> => {
    const data: VideoUpdateData = {
        index: video.index
    }
    return await pb.collection(apiConfig.videoCollectionName).update(video.id, data);
}

export const addVideo = async (videoData: VideoCreateData): Promise<VideoRecord> => {
    return await pb.collection(apiConfig.videoCollectionName).create(videoData);
}

export const deleteVideo = async (video: string) => {
    await pb.collection(apiConfig.videoCollectionName).delete(video);
}
