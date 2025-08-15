import type { MediaCreateData, MediaRecord, MediaRecordNotFound, MediaRecordUpdate } from "$lib/types/MediaTypes";
import apiConfig from "$lib/config/apiConfig.json";
import { get } from 'svelte/store';
import { editorSettings } from '$lib/data/EditorSettingsStore';
import { createRecord, deleteRecord, getFull, getSingleRecord, updateRecord } from './GenericAPI';

export const getMediaURL = (
    mediaRecord: MediaRecord
): string => {
    return `${get(editorSettings).pocketbaseAddress}/api/files/${mediaRecord.collectionId}/${mediaRecord.id}/${mediaRecord.content}`; 
}

export const getAllMedia = async (): Promise<MediaRecord[]> => {
    return await getFull<MediaRecord>(apiConfig.mediaCollectionName, "+index");
}

export const getMediaById = async (
    id: string
): Promise<MediaRecord | MediaRecordNotFound> => {
    return await getSingleRecord<MediaRecord, MediaRecordNotFound>(apiConfig.mediaCollectionName, id);
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
    const data: MediaRecordUpdate = {
        duration: media.duration,
        index: media.index,
        type: media.type,
        name: media.name
    };
    return await updateRecord<MediaRecord, MediaRecordUpdate>(media.id, apiConfig.mediaCollectionName, data);
}

export const addMedia = async (
    data: MediaCreateData
): Promise<MediaRecord> => {
    return await createRecord<MediaRecord, MediaCreateData>(apiConfig.mediaCollectionName, data);
}

export const deleteMedia = async (
    id: string
) => {
    await deleteRecord(id, apiConfig.mediaCollectionName);
}
