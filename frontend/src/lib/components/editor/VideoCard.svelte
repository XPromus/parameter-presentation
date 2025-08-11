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

<div class="flex flex-col space-y-5 rounded-md">
    <video class="object-contain w-full h-full rounded-md" src={getMediaURL(media)} controls></video>
    <div class="grow"></div>
</div>
