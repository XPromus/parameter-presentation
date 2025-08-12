<script lang="ts">
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from "@iconify/svelte";
    import MediaAddDialog from "./MediaAddDialog.svelte";
    import type { MediaRecord } from "$lib/types/mediaTypes";
    import { applyDeleteQueue, clearDeleteQueue, deleteQueue } from "$lib/data/deleteQueueStore";

    let {
        isDirty = $bindable(),
        updateList,
        updateMediaByList,
        mode = $bindable(),
        media
    }: {
        isDirty: boolean,
        updateList: any,
        updateMediaByList: any,
        mode: EditorMode,
        media: MediaRecord[]
    } = $props();

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

</script>

<div class="flex flex-col w-full p-5 space-y-5 bg-gray-800 rounded-md h-fit">
    <div class="flex flex-row space-x-5">
        <MediaAddDialog onUpload={updateList} editorMode={mode} maxIndex={media.length}/>
    </div>
    <div class="flex flex-row space-x-5">
        {#if isDirty}
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="items-center px-5 py-1 text-center duration-200 bg-gray-400 rounded-md opacity-50">
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            </a>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="items-center px-5 py-1 text-center duration-200 bg-gray-400 rounded-md opacity-50 grow">
                <span>To Presentation</span>
            </a>
        {:else}
            <a href="/" class="items-center px-5 py-1 text-center duration-200 bg-gray-400 rounded-md hover:cursor-pointer hover:bg-gray-600 hover:text-white">
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            </a>
            <a href="/presentation" class="items-center px-5 py-1 text-center duration-200 bg-gray-400 rounded-md grow hover:cursor-pointer hover:bg-gray-600 hover:text-white">
                <span>To Presentation</span>
            </a>
        {/if}
        <a href="/editor/settings" class="px-5 py-1 text-center transition-all duration-200 bg-gray-400 rounded-md grow hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            Settings
        </a>
        <button onclick={onReset} class="px-5 py-1 transition-all duration-200 bg-gray-500 rounded-md grow hover:cursor-pointer hover:bg-gray-700 hover:text-white">
            Reset
        </button>
        {#if mode == EditorMode.EDIT}
            {#if isDirty}
                <button onclick={onApply} class="px-5 py-1 text-green-400 transition-all duration-200 border border-green-500 rounded-md bg-green-400/10 basis-1/2 hover:cursor-pointer hover:bg-green-700/10 hover:text-green-400 active:bg-green-900">
                    Apply *
                </button>
            {:else}
                <button onclick={onApply} class="px-5 py-1 text-green-400 transition-all duration-200 border border-green-500 rounded-md opacity-50 bg-green-400/10 basis-1/2">
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
