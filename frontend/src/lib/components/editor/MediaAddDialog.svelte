<script lang="ts">
    import { addMedia } from "$lib/api/mediaServerAPI";
    import { EditorMode } from "$lib/config/editorMode";
    import { editorSettings } from "$lib/data/editorSettingsStore";
    import type { MediaCreateData } from "$lib/types/mediaTypes";
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte";

    let { editorMode, onUpload, maxIndex }: { editorMode: EditorMode, onUpload: any, maxIndex: number } = $props();
    let disabled = $derived(editorMode == EditorMode.DELETE);

    let fileInputValue: string = $state("");
    let files: FileList | undefined = $state();
    let duration: number = $state($editorSettings.defaultDuration);

    const allowedImageTypes = [ "image/jpg" ];
    const allowedVideoTypes = [ "video/mp4" ];

    const getMimeString = (): string => {
        let returnString = "";
        allowedImageTypes.forEach((element) => {
            returnString = returnString.concat(" ", `${element}`);
        });

        allowedVideoTypes.forEach((element) => {
            returnString = returnString.concat(" ", `${element}`);
        });
        console.log(returnString);
        return returnString;
    }

    const onAdd = async () => {
        if (files != undefined) {
            for (let index = 0; index < files.length; index++) {
                const element = files.item(index);
                if (element == null) throw new Error(`File error with file ${index}`);
                
                await addMedia({
                    content: element,
                    duration: duration,
                    index: maxIndex + index,
                    type: element.type.split("/")[0],
                    name: "New Element"
                } satisfies MediaCreateData); 
            }

            onClearFiles();           
            onUpload();
        }
    }

    const onClearFiles = () => {
        fileInputValue = "";
    }

    onMount(() => {
        duration = $editorSettings.defaultDuration;
    });
</script>

<div class="flex flex-row space-x-5 grow">
    <div class="flex flex-col space-y-5 grow">
        <div class="flex flex-row items-center space-x-5">
            <span class="text-white basis-1/5">New Files</span>
            <input bind:value={fileInputValue} bind:files={files} multiple class="h-full p-1 text-center rounded-md grow bg-slate-300 disabled:opacity-50" type="file" disabled={disabled} accept={getMimeString()}>
            <button onclick={onClearFiles} class="p-2 transition-all duration-150 bg-red-500 rounded-md hover:bg-red-700 hover:cursor-pointer active:bg-red-900 hover:text-white">
                <Icon icon="material-symbols:remove" width="24" height="24" />
            </button>
        </div>
        <div class="flex flex-row space-x-5">
            <span class="text-white basis-1/5">Duration (ms)</span>
            <input bind:value={duration} class="p-1 rounded-md grow bg-slate-300 disabled:opacity-50" type="number" disabled={disabled}>
        </div>
    </div>
    <button onclick={onAdd} class="flex items-center justify-center p-5 space-y-5 transition-all duration-150 rounded-md bg-slate-500 enabled:hover:bg-slate-700 enabled:hover:cursor-pointer disabled:opacity-50" disabled={disabled}>
        <span class="text-xl text-white">
            <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        </span>
    </button>
</div>
