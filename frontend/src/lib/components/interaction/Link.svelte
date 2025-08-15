<script lang="ts">
    import theme from "$lib/theme/theme.json";
    import type { ThemeTypes } from "$lib/theme/themeTypes";
    import type { TooltipOptions } from "$lib/types/tooltipTypes";
    import Tooltip from "./Tooltip.svelte";

    let {
        href,
        type,
        disabled = false,
        classes = "",
        children,
        tooltipOptions,
    }: {
        href: any,
        type: "success" | "danger" | "neutral",
        disabled?: boolean,
        classes?: string,
        children: any,
        tooltipOptions?: TooltipOptions
    } = $props();

    let showTooltip: boolean = $state(false);
</script>

{#if disabled}
    <a href="#" class={`flex justify-center px-5 py-1 text-center duration-200 rounded-md opacity-50 ${theme[`${type}Disabled` as keyof ThemeTypes]} ${classes}`}>
        {@render children()}
    </a>
{:else}
    <a onmouseenter={() => showTooltip = true} onmouseleave={() => showTooltip = false} href={href} class={`relative flex justify-center px-5 py-1 text-center duration-200 rounded-md ${theme[type as keyof ThemeTypes]}`}>
        {@render children()}
        {#if tooltipOptions !== undefined}
            <Tooltip show={showTooltip} options={tooltipOptions} />
        {/if}
    </a>
{/if}
