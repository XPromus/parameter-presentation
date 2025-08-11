<script lang="ts">
    import { MediaType } from "$lib/types/mediaTypes";
    import Icon from "@iconify/svelte";

    let { mediaType }: { mediaType: MediaType } = $props();
    const iconSize: number = 20;
</script>

<span class="rounded-full bg-slate-700 w-10 h-10 flex justify-center items-center text-white font-bold">
    {#if mediaType == MediaType.IMAGE}
        <Icon icon="material-symbols:image-outline" width={iconSize} height={iconSize} />    
    {:else if mediaType == MediaType.VIDEO}
        <Icon icon="material-symbols:hangout-video-rounded" width={iconSize} height={iconSize} />
    {/if}
</span>