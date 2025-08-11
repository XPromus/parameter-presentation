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

<div class="flex flex-col space-y-5 rounded-md">
    <img class="object-contain rounded-md" src={getMediaURL(media)} alt="Record">
    <div class="grow"></div>
    <div class="flex flex-row space-x-5"> 
        <span class="font-bold">Duration (ms)</span>
        <input oninput={onChange} class="px-2 rounded-md bg-slate-200 grow" bind:value={media.duration} type="number">
    </div>
</div>
