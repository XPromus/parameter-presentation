import { deleteImage } from "$lib/api/ImageServerAPI";
import { writable } from "svelte/store";

export const deleteQueue = writable<string[]>([]);

export const addIdToDeleteQueue = (id: string) => {
    deleteQueue.update((list) => {
        const indexOf = list.indexOf(id);
        if (indexOf == -1) {
            list.push(id);
        }
        return list;
    })
}

export const removeIdFromDeleteQueue = (id: string) => {
    deleteQueue.update((list) => {
        const indexOf = list.indexOf(id);
        if (indexOf == -1) {
            throw new Error(`Element with id ${id} could bot be found`);
        }
        list.splice(indexOf, 1);

        return list;
    });
}

export const applyDeleteQueue = async (idList: string[]) => {
    for (let index = 0; index < idList.length; index++) {
        const element = idList[index];
        await deleteImage(element)
    }
}

export const clearDeleteQueue = () => {
    deleteQueue.set([]);
}
