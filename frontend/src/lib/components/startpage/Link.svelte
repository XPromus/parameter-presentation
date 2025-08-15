<script lang="ts">
    import type { TooltipOptions } from "$lib/types/tooltipTypes";
    import Tooltip from "../interaction/Tooltip.svelte";

    let {
        href,
        text,
        tooltipOptions,
    }: {
        href: string,
        text: string,
        tooltipOptions?: TooltipOptions,
    } = $props();

    let showTooltip: boolean = $state(false);
</script>

<a onmouseenter={() => showTooltip = true} onmouseleave={() => showTooltip = false} href={href} class="flex items-center justify-center w-full h-full transition-all duration-150 rounded-md drop-shadow-md drop-shadow-black bg-slate-500/50 basis-1/2 hover:bg-slate-700/50 hover:cursor-pointer active:bg-slate-900/50">
    <span class="text-5xl font-bold text-white">{text}</span>
    {#if tooltipOptions !== undefined}
        <Tooltip show={showTooltip} options={tooltipOptions} />
    {/if}
</a>
