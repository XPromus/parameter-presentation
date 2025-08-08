<script lang="ts">
    import { addImage } from "$lib/api/ImageServerAPI";
    import { EditorMode } from "$lib/config/editorMode";
    import Icon from '@iconify/svelte';

    let { editorMode, onUpload, maxIndex }: { editorMode: EditorMode, onUpload: any, maxIndex: number } = $props();
    let disabled = $derived(editorMode == EditorMode.DELETE);

    let files: FileList | undefined = $state();
    let duration: number | undefined = $state();

    const onAdd = async () => {
        if (files != undefined) {
            for (let index = 0; index < files.length; index++) {
                const element = files.item(index);
                await addImage({
                    image: element!!,
                    duration: duration!!,
                    index: maxIndex + index + 1
                });
            }
            files = undefined;
            onUpload();
        }
    }
</script>

<div class="flex flex-row space-x-5">
    <div class="flex flex-col space-y-5 grow">
        <div class="flex flex-row space-x-5">
            <span class="basis-1/5 text-white">Files</span><input bind:files={files} multiple class="grow bg-slate-300 rounded-md disabled:opacity-50" type="file" disabled={disabled} accept="image/png, image/jpeg, image/jpg">
        </div>
        <div class="flex flex-row space-x-5">
            <span class="basis-1/5 text-white">Duration</span><input bind:value={duration} class="grow bg-slate-300 rounded-md disabled:opacity-50" type="number" disabled={disabled}>
        </div>
    </div>
    <button onclick={onAdd} class="flex bg-slate-500 p-5 rounded-md space-y-5 justify-center items-center enabled:hover:bg-slate-700 enabled:hover:cursor-pointer transition-all duration-200 disabled:opacity-50" disabled={disabled}>
        <span class="text-xl text-white">
            <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        </span>
    </button>
</div>
