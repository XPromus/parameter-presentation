<script lang="ts">
    import { addColor, getAllColors } from "$lib/api/ColorAPI";
    import IconButton from "$lib/components/interaction/IconButton.svelte";
    import type { ColorCreateData, ColorRecord } from "$lib/types/ColorTypes";
    import Icon from "@iconify/svelte";
    import ColorCrumb from "./ColorCrumb.svelte";
    import { onMount } from "svelte";
    import { createNewColor } from "$lib/middleware/ColorMiddleware";

    let selectedColor: string = $state("");
    let loadedColors: ColorRecord[] = $state([]);

    const onColorAddButtonClicked = async () => {
        await createNewColor(selectedColor);
        await getColors();
    }

    const getColors = async () => {
        loadedColors = await getAllColors();
    }

    onMount(async () => {
        await getColors();
    });
</script>

<div class="h-fit flex flex-row space-x-5 grow">
    <div class="flex flex-row space-x-2">
        <IconButton 
            action={onColorAddButtonClicked}
            type="success"
            tooltipOptions={ {text: "Add new color", position: "top"} }
        >
            <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        </IconButton>
        <input class="rounded-full w-14 h-14" bind:value={selectedColor} type="color" name="" id="">
    </div>
    <div class="flex flex-row space-x-2 bg-slate-500/20 rounded-md p-2 grow">
        <span class="w-10 h-10 text-white flex justify-center items-center">
            <Icon icon="mdi:color" width="32" height="32" />
        </span>
         <div class="flex flex-row gap-2 grow min-w-0 overflow-x-scroll">
            {#each loadedColors as color }
                <ColorCrumb color={color} reloadList={getColors} />
            {/each}
        </div>
    </div>
</div>
