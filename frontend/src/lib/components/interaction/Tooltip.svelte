<script lang="ts">
    import type { TooltipOptions } from '$lib/types/TooltipTypes';

    let {
        show,
        options,
    }: {
        show: boolean,
        options: TooltipOptions
    } = $props();

    const styleClass: string = "absolute text-center p-2 bg-slate-900 border border-slate-700 z-50 rounded-md";
</script>

{#if show}
    {#if options.position == "top"}
        <div class={`-top-2 -translate-y-full ${styleClass}`}>
            {@render content()}
        </div>
    {:else if options.position == "bottom"}
        <div class={`-bottom-2 translate-y-full ${styleClass}`}>
            {@render content()}
        </div>
    {:else if options.position == "left"}
        <div class={`-left-2 -translate-x-full ${styleClass}`}>
            {@render content()}
        </div>
    {:else if options.position == "right"}
        <div class={`-right-2 translate-x-full ${styleClass}`}>
            {@render content()}
        </div>
    {/if}
{/if}

{#snippet content()}
    <span class="text-s">{options.text}</span>
{/snippet}
