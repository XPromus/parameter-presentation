<script lang="ts">
    import { addMedia } from "$lib/api/mediaServerAPI";
    import { EditorMode } from "$lib/config/editorMode";
    import { editorSettings } from "$lib/data/editorSettingsStore";
    import type { MediaCreateData } from "$lib/types/mediaTypes";
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte";
    import Button from "../interaction/Button.svelte";
    import Input from "../interaction/Input.svelte";
    import FileInput from "../interaction/FileInput.svelte";

    let { editorMode, onUpload, maxIndex }: { editorMode: EditorMode, onUpload: any, maxIndex: number } = $props();
    let disabled = $derived(editorMode == EditorMode.DELETE);

    let fileInputValue: string = $state("");
    let files: FileList | undefined = $state();
    let duration: number = $state($editorSettings.defaultDuration);

    const allowedImageTypes = [ "image/jpg", "image/png", "image/jpeg" ];
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
            <FileInput bind:fileInputValue={fileInputValue} bind:files={files} multiple disabled={disabled} accept={getMimeString()} />
            <Button action={onClearFiles} type="danger" tooltipOptions={{text: "Clear the selected files", position: "top"}}>
                {#snippet children()}
                    <Icon icon="material-symbols:remove" width="24" height="24" />
                {/snippet}
            </Button>
        </div>
        <div class="flex flex-row space-x-5">
            <span class="text-white basis-1/5">Duration (ms)</span>
            <Input bind:value={duration} placeholder="Duration in ms" type="number" />
        </div>
    </div>
    <Button action={onAdd} type="neutral" tooltipOptions={{text: "Add selected files to the database", position: "top"}}>
        <span class="text-xl text-white">
            <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        </span>
    </Button>
</div>
