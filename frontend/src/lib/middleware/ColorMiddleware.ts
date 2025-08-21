import { addColor, getActiveColor, getAllColors, updateColor } from "$lib/api/ColorAPI"
import type { ColorCreateData, ColorRecord, ColorRecordUpdate } from "$lib/types/ColorTypes";

export const getAllColorsAsString = async (): Promise<string[]> => {
    const response = await getAllColors();
    return response.map((element) => {
        return element.color;
    }) satisfies string[];
}

export const isDuplicate = async (
    colorCode: string
): Promise<boolean> => {
    const existingColors: string[] = await getAllColorsAsString();
    for (let i = 0; i < existingColors.length; i++) {
        if (existingColors[i] == colorCode) return true;
    }
    return false;
}

export const createNewColor = async (
    colorCode: string
): Promise<ColorRecord> => {
    const duplicateState = await isDuplicate(colorCode);
    console.log(duplicateState);
    if (!duplicateState) {
        return await addColor({
            color: colorCode,
            active: false
        } satisfies ColorCreateData);
    }
    throw new Error(`Color with code ${colorCode} already exists or could not be created`);
}

export const setColorActive = async (
    color: ColorRecord
) => {
    const oldActiveColor = await getActiveColor();
    for (let i = 0; i < oldActiveColor.length; i++) {
        const element = oldActiveColor[i];
        await updateColor(element.id, {
            color: element.color,
            active: false
        } satisfies ColorRecordUpdate)
    }

    await updateColor(color.id, {
        color: color.color,
        active: true
    } satisfies ColorRecordUpdate);
}
