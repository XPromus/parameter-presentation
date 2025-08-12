<script lang="ts">
    import { getMediaURL } from "$lib/api/mediaServerAPI";
    import type { MediaRecord } from "$lib/types/mediaTypes";
    
    let {
        media,
        setIsDirty
    }: {
        media: MediaRecord,
        setIsDirty: any
    } = $props();

    const onChange = () => {
        setIsDirty();
    }
</script>

<div class="flex flex-col w-full h-full space-y-5 rounded-md">
    <video class="h-full max-w-full max-h-full min-w-0 min-h-0 rounded-md bg-slate-500/50" src={getMediaURL(media)} controls></video>
    <div class="grow"></div>
</div>
