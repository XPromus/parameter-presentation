<script lang="ts">
    import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
    import ImageCard from "$lib/components/editor/ImageCard.svelte";
    import MediaAddDialog from "$lib/components/editor/MediaAddDialog.svelte";
    import { onMount } from "svelte";
    import { flip } from 'svelte/animate';
    import { addIdToDeleteQueue, applyDeleteQueue, clearDeleteQueue, deleteQueue, isElementInListWithIndex, removeElementFromListByIndex } from '$lib/data/deleteQueueStore';
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from '@iconify/svelte';
    import ContentTypeCrumb from '$lib/components/editor/ContentTypeCrumb.svelte';
    import type { MediaRecord } from '$lib/types/mediaTypes';
    import VideoCard from '$lib/components/editor/VideoCard.svelte';
    import ContentIndexCrumb from '$lib/components/editor/ContentIndexCrumb.svelte';
    import { getAllMedia, updateMediaByList } from '$lib/api/mediaServerAPI';
    
    let media: MediaRecord[] = $state([]);

    let isDirty = $state<boolean>(false);
    let mode = $state<EditorMode>(EditorMode.EDIT);

    const onApply = async () => {
        switch(mode){
            case EditorMode.EDIT:
                await updateMediaByList(media);
                await updateList();
                isDirty = false;
                break;
            case EditorMode.DELETE:
                await applyDeleteQueue($deleteQueue);
                clearDeleteQueue();
                await updateList();
                mode = EditorMode.EDIT;
                break;
        }
    }

    const onReset = async () => {
        if (mode == EditorMode.DELETE) {
            clearDeleteQueue();
            mode = EditorMode.EDIT;
        }
        
        await updateList();
        isDirty = false;
    }

    const onDelete = (id: string) => {
        mode = EditorMode.DELETE;
        const queueCheck = isElementInListWithIndex(id, $deleteQueue);
        if (!queueCheck[0]) {
            addIdToDeleteQueue(id);
        } else {
            removeElementFromListByIndex(queueCheck[1]);
        }
    }

    const handleDrop = (state: DragDropState<MediaRecord>) => {
        const { draggedItem, sourceContainer, targetContainer } = state;
        if (!targetContainer || sourceContainer === targetContainer) return;

        media = media.filter((card: MediaRecord) => card.index !== draggedItem.index);
        media.splice(parseInt(targetContainer), 0, draggedItem);

        media = updateMediaIndex(media);
        isDirty = true;
    }

    const updateMediaIndex = (list: MediaRecord[]): MediaRecord[] => {
        for (let i = 0; i < list.length; i++) {
            list[i].index = i;
        }
        return list;
    }

    const getDeleteBorderColor = (id: string): string => {
        if (isElementInListWithIndex(id, $deleteQueue)[0]) {
            return "border border-red-500 bg-red-300"
        } else {
            return "bg-white/50 hover:bg-white/60"
        }
    }

    const updateList = async () => {
        const currentMedia = await getAllMedia();
        const updated = updateMediaIndex(currentMedia);
        await updateMediaByList(updated);
        media = await getAllMedia();
    }

    onMount(async () => {
        await updateList();
    })
</script>

<div class="flex flex-col w-screen h-screen p-5 space-y-5">
    <div class="grid grid-cols-3 gap-6 overflow-y-scroll xl:grid-cols-6">
        {#each media as card, i (card.index)}
            <div
                use:droppable={{ container: i.toString(), callbacks: { onDrop: handleDrop } }}
                class="relative aspect-square rounded-xl p-5 backdrop-blur-sm
                        transition-all duration-300  {getDeleteBorderColor(card.id)}" 
                animate:flip={{ duration: 300 }}
            >
                <div class="flex flex-row pb-5">
                    <div class="flex flex-row space-x-1">
                        <ContentIndexCrumb index={card.index + 1}/>
                        <ContentTypeCrumb mediaType={card.type} />    
                    </div>
                    <div class="grow"></div>
                    <button onclick={() => onDelete(card.id)} class="flex items-center justify-center w-10 h-10 font-bold text-white bg-red-500 rounded-full disabled:bg-gray-700 disabled:opacity-50 hover:cursor-pointer hover:bg-red-700" disabled={isDirty}>
                        {#if mode == EditorMode.EDIT}
                            <Icon icon="material-symbols:delete" width="20" height="20" />                        
                        {:else if mode == EditorMode.DELETE}
                            {#if isElementInListWithIndex(card.id, $deleteQueue)[0]}
                                <Icon icon="material-symbols:check-box-outline-rounded" width="20" height="20" />
                            {:else}
                                <Icon icon="material-symbols:check-box-outline-blank" width="20" height="20" />
                            {/if}
                        {/if}
                    </button>  
                </div>
                {#if mode == EditorMode.EDIT}
                    <div
                        use:draggable={{
                            container: i.toString(),
                            dragData: card
                        }}
                        class={`h-full w-full cursor-move rounded-lg bg-gradient-to-br svelte-dnd-touch-feedback shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 active:brightness-110`}
                    >
                        {#if card.type == "image"}
                            <ImageCard setIsDirty={() => {isDirty = true}} media={card} />
                        {:else if card.type == "video"}
                            <VideoCard setIsDirty={() => {isDirty = true}} media={card} />
                        {/if}
                    </div>
                {:else if mode == EditorMode.DELETE}
                    <div class={`h-full w-full cursor-move rounded-lg bg-gradient-to-br transition-all duration-300`}>
                        {#if card.type == "image"}
                            <ImageCard setIsDirty={() => {isDirty = true}} media={card} />
                        {:else if card.type == "video"}
                            <VideoCard setIsDirty={() => {isDirty = true}} media={card} />
                        {/if}
                    </div>
                {/if}
                
            </div>
        {/each}
    </div>
    <div class="grow"></div>
    <MediaAddDialog onUpload={updateList} editorMode={mode} maxIndex={media.length}/>
    <div class="flex flex-row space-x-5">
        <a href="/editor/settings" class="px-5 py-1 text-center transition-all duration-200 bg-gray-400 rounded-md grow hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            Settings
        </a>
        <button onclick={onReset} class="px-5 py-1 transition-all duration-200 bg-gray-500 rounded-md grow hover:cursor-pointer hover:bg-gray-700 hover:text-white">
            Reset
        </button>
        {#if mode == EditorMode.EDIT}
            {#if isDirty}
                <button onclick={onApply} class="px-5 py-1 transition-all duration-200 bg-green-500 rounded-md basis-1/2 hover:cursor-pointer hover:bg-green-700 hover:text-white">
                    Apply *
                </button>
            {:else}
                <button onclick={onApply} class="px-5 py-1 transition-all duration-200 bg-green-500 rounded-md opacity-50 basis-1/2 hover:cursor-pointer hover:bg-green-700 hover:text-white">
                    Apply
                </button>
            {/if}
        {:else if mode == EditorMode.DELETE}
            <button onclick={onApply} class="px-5 py-1 text-white transition-all duration-200 bg-red-500 rounded-md basis-1/2 hover:cursor-pointer hover:bg-red-700">
                Delete
            </button>
        {/if}
    </div>
</div>

