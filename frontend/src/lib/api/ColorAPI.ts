import apiConfig from "$lib/config/apiConfig.json";
import type { ColorCreateData, ColorRecord, ColorRecordUpdate } from '$lib/types/ColorTypes';
import { createRecord, deleteRecord, getFull, getSingleRecord, updateRecord } from './GenericAPI';
import type { RecordNotFoundResponse } from '$lib/types/PocketbaseBaseTypes';

export const getAllColors = async (): Promise<ColorRecord[]> => {
    return await getFull<ColorRecord>(apiConfig.colorCollectionName, "+color");
}

export const getColorById = async (
    id: string
): Promise<ColorRecord | RecordNotFoundResponse> => {
    return await getSingleRecord<ColorRecord, RecordNotFoundResponse>(apiConfig.colorCollectionName, id);
}

export const addColor = async (
    data: ColorCreateData
): Promise<ColorRecord> => {
    return await createRecord<ColorRecord, ColorCreateData>(apiConfig.colorCollectionName, data);
}

export const updateColor = async (
    id: string, 
    data: ColorRecordUpdate
): Promise<ColorRecord> => {
    return await updateRecord<ColorRecord, ColorRecordUpdate>(id, apiConfig.colorCollectionName, data);
}

export const deleteColor = async (
    id: string
) => {
    await deleteRecord(id, apiConfig.colorCollectionName);
}
