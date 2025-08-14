// TODO: Implement more unified data structure with media collection

import PocketBase from 'pocketbase';
import type { MediaCreateData, MediaRecord, MediaRecordNotFound, MediaRecordUpdate } from "$lib/types/mediaTypes";
import apiConfig from "$lib/config/apiConfig.json";
import { get } from 'svelte/store';
import { editorSettings } from '$lib/data/editorSettingsStore';

export const getMediaURL = (
    mediaRecord: MediaRecord
): string => {
    return `${get(editorSettings).pocketbaseAddress}/api/files/${mediaRecord.collectionId}/${mediaRecord.id}/${mediaRecord.content}`; 
}

export const getAllMedia = async (): Promise<MediaRecord[]> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(apiConfig.mediaCollectionName).getFullList<MediaRecord>({
        sort: "+index"
    });
}

export const getMediaById = async (
    id: string
): Promise<MediaRecord | MediaRecordNotFound> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(apiConfig.mediaCollectionName).getOne(id);
}

export const updateMediaByList = async (
    media: MediaRecord[]
) => {
    for (let i = 0; i < media.length; i++) {
        const element = media[i];
        await updateMedia(element);       
    }
}

export const updateMedia = async (
    media: MediaRecord
): Promise<MediaRecord> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    const data: MediaRecordUpdate = {
        duration: media.duration,
        index: media.index,
        type: media.type,
        name: media.name
    };
    return await pb.collection(apiConfig.mediaCollectionName).update(media.id, data);
}

export const addMedia = async (
    data: MediaCreateData
): Promise<MediaRecord> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(apiConfig.mediaCollectionName).create(data);
}

export const deleteMedia = async (
    id: string
) => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    await pb.collection(apiConfig.mediaCollectionName).delete(id);
}
