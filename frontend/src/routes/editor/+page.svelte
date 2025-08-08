<script lang="ts">
    import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
    import { getAllImages, updateImages, updateIndex, type ImageRecord } from "$lib/api/ImageServerAPI";
    import ImageCard from "$lib/components/editor/ImageCard.svelte";
    import MediaAddDialog from "$lib/components/editor/MediaAddDialog.svelte";
    import { onMount } from "svelte";
    import { flip } from 'svelte/animate';
    import { addIdToDeleteQueue, applyDeleteQueue, clearDeleteQueue, deleteQueue, removeIdFromDeleteQueue } from '$lib/data/deleteQueueStore';
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from '@iconify/svelte';
    
    let images: ImageRecord[] = $state([]);
    let isDirty = $state<boolean>(false);

    let mode = $state<EditorMode>(EditorMode.EDIT);

    const onApply = async () => {
        switch(mode){
            case EditorMode.EDIT:
                await updateImages(images);
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
        
        images = await getAllImages();
        isDirty = false;
    }

    const onDelete = (id: string) => {
        mode = EditorMode.DELETE;
        if ($deleteQueue.indexOf(id) == -1) {
            addIdToDeleteQueue(id);
        } else {
            removeIdFromDeleteQueue(id);
        }
        
    }

    const handleDrop = (state: DragDropState<ImageRecord>) => {
        const { draggedItem, sourceContainer, targetContainer } = state;
        if (!targetContainer || sourceContainer === targetContainer) return;

        images = images.filter((card: ImageRecord) => card.id !== draggedItem.id);
        images.splice(parseInt(targetContainer), 0, draggedItem);

        updateMediaIndex();
        isDirty = true;
    }

    const updateMediaIndex = () => {
        for (let index = 0; index < images.length; index++) {
            images[index].index = index;
        }
    }

    const getDeleteBorderColor = (id: string): string => {
        if ($deleteQueue.indexOf(id) != -1) {
            return "border border-red-500 bg-red-300"
        } else {
            return "bg-white/50 hover:bg-white/60"
        }
    }

    const updateList = async () => {
        await updateIndex()
        images = await getAllImages();
    }

    onMount(async () => {
        await updateList();
    })
</script>

<div class="w-screen h-screen flex flex-col p-5 space-y-5">

    <div class="grid xl:grid-cols-6 grid-cols-3 gap-6 overflow-y-scroll">
        {#each images as card, index (card.id)}
            <div
                use:droppable={{ container: index.toString(), callbacks: { onDrop: handleDrop } }}
                class="relative aspect-square rounded-xl p-5 backdrop-blur-sm
                        transition-all duration-300  {getDeleteBorderColor(card.id)}" 
                animate:flip={{ duration: 300 }}
            >
                <div class="flex flex-row pb-5">
                    <span class="rounded-full bg-slate-700 text-white font-bold py-1 px-3">{card.index + 1}</span>  
                    <div class="grow"></div>
                    <button onclick={() => onDelete(card.id)} class="rounded-full bg-red-700 disabled:bg-gray-700 disabled:opacity-50 text-white font-bold p-1" disabled={isDirty}>
                        {#if mode == EditorMode.EDIT}
                            <Icon icon="material-symbols:delete" width="24" height="24" />                        
                        {:else if mode == EditorMode.DELETE}
                            {#if $deleteQueue.indexOf(card.id) != -1}
                                <Icon icon="material-symbols:check-box-outline-rounded" width="24" height="24" />
                            {:else}
                                <Icon icon="material-symbols:check-box-outline-blank" width="24" height="24" />
                            {/if}
                        {/if}
                    </button>  
                </div>
                <div
                    use:draggable={{
                        container: index.toString(),
                        dragData: card
                    }}
                    class={`h-full w-full cursor-move rounded-lg bg-gradient-to-br svelte-dnd-touch-feedback shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 active:brightness-110`}
                >
                    <ImageCard setIsDirty={() => {isDirty = true}} targetImage={card} />
                </div>
            </div>
        {/each}
    </div>
    <div class="grow"></div>
    <MediaAddDialog onUpload={updateList} editorMode={mode} maxIndex={images[images.length - 1].index}/>
    <div class="flex flex-row space-x-5">
        <a href="/editor/settings" class="text-center grow bg-gray-400 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-gray-600 hover:text-white transition-all duration-200">
            Settings
        </a>
        <button onclick={onReset} class="grow bg-gray-500 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200">
            Reset
        </button>
        {#if mode == EditorMode.EDIT}
            <button onclick={onApply} class="basis-1/2 bg-green-500 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-200">
                {#if isDirty}
                    Apply *
                {:else}
                    Apply
                {/if}
            </button>
        {:else if mode == EditorMode.DELETE}
            <button onclick={onApply} class="basis-1/2 bg-red-500 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-red-700 text-white transition-all duration-200">
                Delete
            </button>
        {/if}
        
    </div>
</div>

