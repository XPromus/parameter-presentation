<script lang="ts">
    import { GetMediaPath, type MediaData } from "$lib/MediaLoader";
    import type { MediaRecord } from "$lib/types/mediaTypes";
    import type { VideoRecord } from "$lib/types/videoTypes";
    
    let {
        targetVideo,
        setIsDirty
    }: {
        targetVideo: MediaRecord,
        setIsDirty: any
    } = $props();

    const onChange = () => {
        setIsDirty();
    }
</script>

<div class="flex flex-col space-y-5 rounded-md">
    <video class="object-contain w-full h-full rounded-md" src={targetVideo.url} controls></video>
    <div class="grow"></div>
</div>
