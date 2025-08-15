import { getAllMedia } from '$lib/api/MediaServerAPI';
import type { PageLoad } from './$types';

export const load = (async () => {
    return {
        media: await getAllMedia()    
    };
}) satisfies PageLoad;