<script lang="ts">
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from "@iconify/svelte";
    import MediaAddDialog from "./MediaAddDialog.svelte";
    import type { MediaRecord } from "$lib/types/mediaTypes";
    import { applyDeleteQueue, clearDeleteQueue, deleteQueue } from "$lib/data/deleteQueueStore";
    import Button from "../interaction/Button.svelte";
    import Link from "../interaction/Link.svelte";
    import { text } from "@sveltejs/kit";

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
        <Link href="/" disabled={isDirty} type="neutral" tooltipOptions={{text: "Back to the startpage", position: "top"}}>
            {#snippet children()}
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            {/snippet}
        </Link>
        <Link href="/presentation" disabled={isDirty} type="neutral" tooltipOptions={{text: "Open Presentation", position: "top"}}>
            {#snippet children()}
                <span>To Presentation</span>
            {/snippet}
        </Link>
        <Link href="/editor/settings" type="neutral" tooltipOptions={{text: "Open Settings", position: "top"}}>
            {#snippet children()}
                <span>Settings</span>
            {/snippet}
        </Link>
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
