<script lang="ts">
    import theme from "$lib/theme/theme.json";
    import type { ThemeTypes } from "$lib/theme/ThemeTypes";
    import type { TooltipOptions } from "$lib/types/TooltipTypes";
    import Tooltip from "./Tooltip.svelte";

    let {
        action,
        type,
        disabled = false,
        classes = "",
        children,
        tooltipOptions,
    }: {
        action: any,
        type: "success" | "danger" | "neutral",
        disabled?: boolean,
        classes?: string,
        children: any,
        tooltipOptions?: TooltipOptions
    } = $props();

    let showTooltip: boolean = $state(false);
</script>

{#if disabled}
    <button
        class={`relative flex justify-center items-center p-4 transition-all duration-200 border rounded-full opacity-50 ${theme[`${type}Disabled` as keyof ThemeTypes]} ${classes}`}
    >
        {@render children()}
    </button>
{:else}
    <button 
        onclick={action} 
        onmouseenter={() => showTooltip = true}
        onmouseleave={() => showTooltip = false}
        class={`relative flex justify-center items-center p-4 transition-all duration-200 border rounded-full hover:cursor-pointer ${theme[type as keyof ThemeTypes]}`}
    >
        {@render children()}
        {#if tooltipOptions !== undefined}
            <Tooltip show={showTooltip} options={tooltipOptions} />
        {/if}
    </button>
{/if}
