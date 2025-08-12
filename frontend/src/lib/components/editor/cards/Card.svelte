<script lang="ts">
    import { getMediaURL } from "$lib/api/mediaServerAPI";
    import { type MediaRecord } from "$lib/types/mediaTypes";
    import Input from "./Input.svelte";

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
        <img class="object-contain h-full" src={getMediaURL(media)} alt="Record">
    </div>
    <div class="grow"></div>
    <div class="flex flex-col space-y-2">
        <div class="flex flex-row w-full space-x-2"> 
            <span class="text-white basis-2/5">Name</span>
            <Input bind:value={media.name} onChange={onChange} type="text" placeholder="Name of the Media" />
            <!-- <input oninput={onChange} class="px-2 rounded-md bg-slate-200 grow" bind:value={media.name} type="text"> -->
        </div>
        <div class="flex flex-row w-full space-x-2"> 
            <span class="text-white basis-2/5">Duration (ms)</span>
            <Input bind:value={media.duration} onChange={onChange} type="number" placeholder="Time in ms the image is shown"  />
            <!-- <input oninput={onChange} class="px-2 rounded-md bg-slate-200 grow" bind:value={media.duration} type="number"> -->
        </div>
    </div>
</div>
