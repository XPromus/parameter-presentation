import { deleteMedia } from "$lib/api/MediaServerAPI";
import { writable } from "svelte/store";

export const deleteQueue = writable<string[]>([]);

export const addIdToDeleteQueue = (newEntry: string) => {
    deleteQueue.update((list) => {
        if (!isElementInListWithIndex(newEntry, list)[0]) {
            list.push(newEntry);
        }
        return list;
    })
}

export const removeIdFromDeleteQueue = (targetEntry: string) => {
    deleteQueue.update((list) => {
        const listCheck = isElementInListWithIndex(targetEntry, list)
        if (listCheck[0]) {
            list.splice(listCheck[1], 1);
            return list;
        }

        throw new Error(`Element with id ${targetEntry} could not be found in delete queue.`);
    });
}

export const removeElementFromListByIndex = (index: number) => {
    deleteQueue.update((list) => {
        list.splice(index, 1);
        return list;
    })
}

export const applyDeleteQueue = async (queue: string[]) => {
    for (let i = 0; i < queue.length; i++) {
        await deleteMedia(queue[i]);
    }
}

export const clearDeleteQueue = () => {
    deleteQueue.set([]);
}

export const isElementInListWithIndex = (id: string, list: string[]): [boolean, number] => {
    const check = list.indexOf(id);
    return [check != -1, check];
}
