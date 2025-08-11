import { deleteImage } from "$lib/api/imageServerAPI";
import { deleteVideo } from "$lib/api/videoServerAPI";
import { MediaType } from "$lib/types/mediaTypes";
import { writable } from "svelte/store";

export type DeleteEntry = {
    id: string,
    mediaType: MediaType
}

export const deleteQueue = writable<DeleteEntry[]>([]);

export const addIdToDeleteQueue = (newEntry: DeleteEntry) => {
    deleteQueue.update((list) => {
        if (!isElementInList(newEntry.id, list)[0]) {
            list.push(newEntry);
        }
        return list;
    })
}

export const removeIdFromDeleteQueue = (targetEntry: DeleteEntry) => {
    deleteQueue.update((list) => {
        const listCheck = isElementInList(targetEntry.id, list)
        if (listCheck[0]) {
            list.splice(listCheck[1], 1);
            return list;
        }

        throw new Error(`Element with id ${targetEntry.id} could not be found in delete queue.`);
    });
}

export const removeElementFromListByIndex = (index: number) => {
    deleteQueue.update((list) => {
        list.splice(index, 1);
        return list;
    })
}

export const applyDeleteQueue = async (queue: DeleteEntry[]) => {
    for (let i = 0; i < queue.length; i++) {
        const element = queue[i];

        switch (queue[i].mediaType) {
            case MediaType.IMAGE:
                await deleteImage(element.id);
                break;
            case MediaType.VIDEO:
                await deleteVideo(element.id)
                break;
        }
        
    }
}

export const clearDeleteQueue = () => {
    deleteQueue.set([]);
}

export const isElementInList = (id: string, list: DeleteEntry[]): [boolean, number] => {
    for (let i = 0; i < list.length; i++) {
        const listItem = list[i];
        if (listItem.id == id) return [true, i];
    }

    return [false, -1];
}
