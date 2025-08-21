<script lang="ts">
    import { deleteColor } from "$lib/api/ColorAPI";
    import { setColorActive } from "$lib/middleware/ColorMiddleware";
    import type { ColorRecord } from "$lib/types/ColorTypes";
    import Icon from "@iconify/svelte";

    let {
        color,
        reloadList,
    }: {
        color: ColorRecord,
        reloadList: any,
    } = $props();

    let mouseIn: boolean = $state(false);

    const selectColorAsBackground = async () => {
        await setColorActive(color);
        reloadList();
    }

    const onColorDelete = async () => {
        await deleteColor(color.id);
        reloadList();
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    onmouseenter={() => mouseIn = true} 
    onmouseleave={() => mouseIn = false} 
    class="w-fit h-fit flex flex-col-reverse bg-gray-500/50 rounded-full"
>
    <button
        onclick={selectColorAsBackground}
        class="color-crumb w-10 h-10 rounded-full z-10 flex justify-center items-center hover:opacity-85 active:opacity-75 {color.active ? "border-2 border-green-500" : ""}" 
        style="--color:{color.color};"
    >
        {#if color.active}
            <span class="text-green-500 font-bold">
                <Icon icon="material-symbols:check-rounded" width="24" height="24" />
            </span>
        {:else}
            {#if mouseIn}
                <Icon icon="material-symbols:colorize-rounded" width="24" height="24" />
            {/if}
        {/if}
    </button>
    {#if mouseIn}
        <div class="bg-gray-500/50 flex flex-col-reverse -space-y-2 absolute pb-12 rounded-full">
            <button onclick={onColorDelete} class="w-10 h-10 rounded-full flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 text-white">
                <Icon icon="material-symbols:delete-forever-rounded" width="24" height="24" />
            </button>
        </div>
    {/if}
</div>

<style>
    .color-crumb {
        background-color: var(--color);
    }
</style>
