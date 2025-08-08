<script lang="ts">
    import { getImageURL, type ImageRecord } from "$lib/api/ImageServerAPI";
    import { addIdToDeleteQueue } from "$lib/data/deleteQueueStore";

    let { 
        targetImage,
        setIsDirty
    }: { 
        targetImage: ImageRecord,
        setIsDirty: any
    } = $props();

    const onDelete = () => {
        addIdToDeleteQueue(targetImage.id);
        setIsDirty();
    }

    const onChange = () => {
        setIsDirty();
    }
</script>

<div class="flex flex-col rounded-md space-y-5">
    <!-- <div class="flex flex-row">
        <span class="rounded-full bg-slate-700 text-white font-bold py-1 px-3">{targetImage.index + 1}</span>  
        <div class="grow"></div>
        <button onclick={onDelete} class="rounded-full bg-red-700 text-white font-bold py-1 px-3">X</button>  
    </div> -->
    <img class="object-contain rounded-md" src={getImageURL(targetImage)} alt="Record">
    <div class="grow"></div>
    <div class="flex flex-row space-x-5"> 
        <span>Duration (ms)</span>
        <input oninput={onChange} class="bg-slate-200 grow rounded-md px-2" bind:value={targetImage.duration} type="number">
    </div>
</div>
