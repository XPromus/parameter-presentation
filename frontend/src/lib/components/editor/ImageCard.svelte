<script lang="ts">
    import { getMediaURL } from "$lib/api/mediaServerAPI";
    import { type MediaRecord } from "$lib/types/mediaTypes";

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

<div class="flex flex-col items-center h-full max-h-full rounded-md">
    <div class="flex justify-center w-full min-h-0 rounded-md max-h-1/2 basis-1/2 bg-slate-500/50"> 
        <img class="object-contain h-full rounded-md" src={getMediaURL(media)} alt="Record">
    </div>
    <div class="grow"></div>
    <div class="flex flex-row space-x-5"> 
        <span class="font-bold">Duration (ms)</span>
        <input oninput={onChange} class="px-2 rounded-md bg-slate-200 grow" bind:value={media.duration} type="number">
    </div>
</div>
