<script lang="ts">
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from "@iconify/svelte";
    import MediaAddDialog from "./MediaAddDialog.svelte";
    import type { MediaRecord } from "$lib/types/MediaTypes";
    import { applyDeleteQueue, clearDeleteQueue, deleteQueue } from "$lib/data/DeleteQueueStore";
    import Button from "../interaction/Button.svelte";
    import Link from "../interaction/Link.svelte";
    import { editorSettings } from "$lib/data/EditorSettingsStore";
    import ColorSelectionMenu from "./colors/ColorSelectionMenu.svelte";

    let {
        isDirty = $bindable(),
        hasUpdateFromServer = $bindable(),
        updateList,
        updateMediaByList,
        mode = $bindable(),
        media
    }: {
        isDirty: boolean,
        hasUpdateFromServer: boolean,
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

    const onReload = async () => {
        await updateList();
        hasUpdateFromServer = false;
        isDirty = false;
    }

</script>

<div class="flex flex-col w-full p-5 space-y-5 bg-gray-800 rounded-md h-fit max-w-full">
    <ColorSelectionMenu />
    <div class="flex flex-row space-x-5 grow max-w-full">
        <MediaAddDialog onUpload={updateList} editorMode={mode} maxIndex={media.length}/>
    </div>
    <div class="flex flex-row space-x-5">
        <Link href="/" disabled={isDirty} type="neutral" tooltipOptions={{text: "Back to the startpage", position: "top"}}>
            <Icon icon="material-symbols:home-rounded" width="24" height="24" />
        </Link>
        <Link href="/presentation" disabled={isDirty} type="neutral" tooltipOptions={{text: "Open Presentation", position: "top"}}>
            <span>To Presentation</span>
        </Link>
        <Link href="/editor/settings" type="neutral" tooltipOptions={{text: "Open Settings", position: "top"}}>
            <span>Settings</span>
        </Link>
        <Link href={`${$editorSettings.pocketbaseAddress}_/`} type="neutral" tooltipOptions={{text: "Open Pocketbase", position:"top"}} openInSeperateTab>
            <Icon icon="material-symbols:database-outline" width="24" height="24" />
        </Link>
        {#if mode == EditorMode.EDIT}
            <Button action={onReload} type={hasUpdateFromServer ? "success" : "neutral"} tooltipOptions={{text: "Reload media from the database", position: "top"}}>
                <Icon icon="material-symbols:download-rounded" width="24" height="24" />
            </Button>
        {/if}
        <Button action={onReset} type="neutral" tooltipOptions={{text: "Reset Changes", position: "top"}}>
            <span>Reset</span>
        </Button>
        {#if mode == EditorMode.EDIT}
            <Button action={onApply} type="success" tooltipOptions={{text: "Apply Changes", position: "top"}} disabled={!isDirty}>
                <span>Apply</span>
            </Button>
        {:else if mode == EditorMode.DELETE}
            <Button action={onApply} type="danger" tooltipOptions={{text: "Delete selected media", position: "top"}}>
                <span>Delete</span>
            </Button>
        {/if}
    </div>
</div>
