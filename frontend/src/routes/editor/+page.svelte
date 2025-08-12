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
    import EditMenu from '$lib/components/editor/EditMenu.svelte';
    
    let media: MediaRecord[] = $state([]);

    let isDirty = $state<boolean>(false);
    let mode = $state<EditorMode>(EditorMode.EDIT);

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
            return "border border-red-500 bg-red-300/10"
        } else {
            return "bg-gray-800"
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
    <div class="grid grid-cols-3 gap-6 overflow-y-scroll xl:grid-cols-6 grow">
        {#each media as card, i (card.index)}
            <div
                use:droppable={{ container: i.toString(), callbacks: { onDrop: handleDrop } }}
                class="relative aspect-square rounded-xl p-5 backdrop-blur-sm
                        transition-all duration-300 shadow-md {getDeleteBorderColor(card.id)}" 
                animate:flip={{ duration: 300 }}
            >
                <div class="flex flex-row pb-5">
                    <div class="flex flex-row space-x-1 grow basis-1/3">
                        <ContentIndexCrumb index={card.index + 1}/>
                        <ContentTypeCrumb mediaType={card.type} />    
                    </div>
                    
                    {#if mode == EditorMode.EDIT}
                        <div use:draggable={{
                            container: i.toString(),
                            dragData: card
                        }} class="flex items-center justify-center text-gray-500 transition-all duration-300 rounded-md cursor-move grow basis-1/3 bg-gradient-to-br svelte-dnd-touch-feedback hover:scale-110 hover:text-white active:text-red-500 active:scale-x-130 active:scale-95 active:brightness-110"
                        >
                            <Icon icon="material-symbols:arrows-output-rounded" width="24" height="24" />
                        </div>
                    {/if}
                    
                    <div class="flex flex-row-reverse grow basis-1/3">
                        <button 
                            onclick={() => onDelete(card.id)} 
                            class="flex items-center justify-center w-10 h-10 font-bold text-red-500 border rounded-full bg-red-400/10 disabled:bg-gray-700 disabled:opacity-50 hover:cursor-pointer hover:bg-red-700/10 border-red-300/10" 
                            disabled={isDirty}
                        >
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
                </div>
                {#if mode == EditorMode.EDIT}
                    <div class={`h-full w-full cursor-move rounded-lg bg-gradient-to-br transition-all duration-300`}>
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
    <EditMenu 
        bind:isDirty={isDirty} 
        updateList={updateList} 
        updateMediaByList={updateMediaByList} 
        bind:mode={mode} 
        media={media}
    />
</div>

