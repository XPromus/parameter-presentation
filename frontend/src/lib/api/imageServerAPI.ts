import PocketBase from 'pocketbase';
import apiConfig from "$lib/config/apiConfig.json"
import type { ImageRecordNotFound, ImageUpdateData, ImageCreateData, ImageRecord } from '$lib/types/imageTypes';

const pb = new PocketBase(apiConfig.baseURL);

export const getImageURL = (image: ImageRecord): string => {
    return `${apiConfig.baseURL}/api/files/${image.collectionId}/${image.id}/${image.image}`;
}

export const getAllImages = async (): Promise<ImageRecord[]> => {
    return await pb.collection(apiConfig.imageCollectionName).getFullList<ImageRecord>({
        sort: "+index"
    });
}

export const getImageById = async (id: string): Promise<ImageRecord | ImageRecordNotFound> => {
    return await pb.collection(apiConfig.imageCollectionName).getOne(id);
}

// export const getImageByIndex = async (index: number): Promise<ImageRecord | ImageRecordNotFound> => {
//     return await pb.collection(apiConfig.imageCollectionName).getFirstListItem<ImageRecord>(
//         `index="${index}"`
//     );
// }

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

export const updateImage = async (image: ImageRecord): Promise<ImageRecord> => {
    const data: ImageUpdateData = {
        duration: image.duration,
        index: image.index
    };
    return await pb.collection(apiConfig.imageCollectionName).update(image.id, data);
}

export const addImage = async (imageData: ImageCreateData): Promise<ImageRecord> => {
    return await pb.collection(apiConfig.imageCollectionName).create(imageData);
}

export const deleteImage = async (image: string) => {
    await pb.collection(apiConfig.imageCollectionName).delete(image);
}

// export const updateIndex = async () => {
//     const images = await getAllImages();
//     const udpateList: ImageRecord[] = [];
//     for (let index = 0; index < images.length; index++) {
//         const element = images[index];
//         element.index = index;
//         udpateList.push(element);
//     }
//     await updateImages(udpateList);
// }
