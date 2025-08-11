<script lang="ts">
    import { getImageURL } from "$lib/api/imageServerAPI";
    import { addIdToDeleteQueue, type DeleteEntry } from "$lib/data/deleteQueueStore";
    import type { ImageRecord } from "$lib/types/imageTypes";
    import { type MediaRecord, MediaType } from "$lib/types/mediaTypes";

    let { 
        targetImage,
        setIsDirty
    }: { 
        targetImage: MediaRecord,
        setIsDirty: any
    } = $props();

    const onDelete = () => {
        addIdToDeleteQueue({
            id: targetImage.raw.id,
            mediaType: MediaType.IMAGE
        } satisfies DeleteEntry);
        setIsDirty();
    }

    const onChange = () => {
        setIsDirty();
    }
</script>

<div class="flex flex-col space-y-5 rounded-md">
    <img class="object-contain rounded-md" src={targetImage.url} alt="Record">
    <div class="grow"></div>
    <div class="flex flex-row space-x-5"> 
        <span>Duration (ms)</span>
        <input oninput={onChange} class="px-2 rounded-md bg-slate-200 grow" bind:value={targetImage.duration} type="number">
    </div>
</div>
