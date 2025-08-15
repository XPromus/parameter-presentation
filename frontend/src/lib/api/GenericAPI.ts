import { editorSettings } from "$lib/data/EditorSettingsStore";
import PocketBase from 'pocketbase';
import { get } from "svelte/store";

export const getFull = async <T>(
    collectionName: string,
    sort: string
): Promise<T[]> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(collectionName).getFullList<T>({
        sort: sort
    }); 
}

export const getSingleRecord = async <T, TNotFoundError>(
    collectionName: string,
    id: string
): Promise<T | TNotFoundError> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(collectionName).getOne(id);
}

export const createRecord = async <T, TCreateData extends Object>(
    collectionName: string,
    data: TCreateData
): Promise<T> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(collectionName).create(data);
}

export const updateRecord = async <T, TUpdateData extends Object>(
    id: string,
    collectionName: string,
    updateData: TUpdateData
): Promise<T> => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    return await pb.collection(collectionName).update(id, updateData);
}

export const deleteRecord = async (
    id: string,
    collectionName: string
) => {
    const pb = new PocketBase(get(editorSettings).pocketbaseAddress);
    await pb.collection(collectionName).delete(id);
}
