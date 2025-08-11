<script lang="ts">
    import Icon from "@iconify/svelte";

    let { mediaType }: { mediaType: string } = $props();
    const iconSize: number = 20;
</script>

<span class="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-slate-700">
    {#if mediaType == "image"}
        <Icon icon="material-symbols:image-outline" width={iconSize} height={iconSize} />    
    {:else if mediaType == "video"}
        <Icon icon="material-symbols:hangout-video-rounded" width={iconSize} height={iconSize} />
    {/if}
</span>