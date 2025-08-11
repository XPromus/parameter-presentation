<script lang="ts">
    import { addImage } from "$lib/api/imageServerAPI";
    import { addVideo } from "$lib/api/videoServerAPI";
    import { EditorMode } from "$lib/config/editorMode";
    import { editorSettings } from "$lib/data/editorSettingsStore";
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte";

    let { editorMode, onUpload, maxIndex }: { editorMode: EditorMode, onUpload: any, maxIndex: number } = $props();
    let disabled = $derived(editorMode == EditorMode.DELETE);

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
                
                const elementType = element.type.split("/");
                switch(elementType[0]){
                    case "image":
                        await addImage({
                            image: element,
                            duration: duration,
                            index: maxIndex + index + 1
                        });
                        break;
                    case "video":
                        await addVideo({
                            video: element,
                            index: maxIndex + index + 1
                        });
                        break;
                }   
            }

            onClearFiles();           
            onUpload();
        }
    }

    const onClearFiles = () => {
        files = undefined;
    }

    onMount(() => {
        duration = $editorSettings.defaultDuration;
    });
</script>

<div class="flex flex-row space-x-5">
    <div class="flex flex-col space-y-5 grow">
        <div class="flex flex-row space-x-5">
            <span class="basis-1/5 text-white">Files</span><input bind:files={files} multiple class="grow bg-slate-300 rounded-md disabled:opacity-50" type="file" disabled={disabled} accept={getMimeString()}>
            <button class="p-2 bg-red-500 rounded-md hover:bg-red-700 hover:cursor-pointer">
                <Icon icon="material-symbols:remove" width="24" height="24" />
            </button>
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
