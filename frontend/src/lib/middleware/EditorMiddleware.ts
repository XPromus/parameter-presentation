import type { MediaRecord } from "$lib/types/MediaTypes";

export const updateIndexForMedia = (media: MediaRecord[]): MediaRecord[] => {
    const returnList: MediaRecord[] = new Array(media.length);
    media.sort((a, b) => {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
    })

    for (let i = 0; i < returnList.length; i++) {
        returnList[i] = media[i];
        returnList[i].index = i;
    }

    return returnList;
}
