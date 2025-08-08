import PocketBase from 'pocketbase';
import apiConfig from "$lib/config/apiConfig.json"

const pb = new PocketBase(apiConfig.baseURL);

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

export type ImageCreateData = {
    image: File,
    duration: number,
    index: number
}

export type ImageUpdateData = {
    duration: number,
    index: number,
}

export const getImageURL = (image: ImageRecord): string => {
    return `${apiConfig.baseURL}/api/files/${image.collectionId}/${image.id}/${image.image}`
}

export const getAllImages = async (): Promise<ImageRecord[]> => {
    return await pb.collection(apiConfig.imageCollectionName).getFullList<ImageRecord>({
        sort: "+index"
    });
}

export const updateImages = async (images: ImageRecord[]) => {
    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        const data: ImageUpdateData = {
            duration: element.duration,
            index: element.index
        };
        await pb.collection(apiConfig.imageCollectionName).update(element.id, data);
    }
}

export const addImage = async (imageData: ImageCreateData): Promise<ImageRecord> => {
    return await pb.collection(apiConfig.imageCollectionName).create(imageData);
}

export const deleteImage = async (image: string) => {
    await pb.collection(apiConfig.imageCollectionName).delete(image);
}

export const updateIndex = async () => {
    const images = await getAllImages();
    const udpateList: ImageRecord[] = [];
    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        element.index = index;
        udpateList.push(element);
    }
    await updateImages(udpateList);
}

