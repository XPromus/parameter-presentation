<script lang="ts">
    import theme from "$lib/theme/theme.json";
    import type { ThemeTypes } from "$lib/theme/themeTypes";

    let {
        action,
        type,
        disabled = false,
        classes = "",
        children,
    }: {
        action: any,
        type: string,
        disabled?: boolean,
        classes?: string,
        children: any
    } = $props();
</script>

{#if disabled}
    <button
        class={`flex justify-center items-center px-5 py-1 grow transition-all duration-200 border rounded-md opacity-50 ${theme[`${type}Disabled` as keyof ThemeTypes]} ${classes}`}
    >
        {@render children()}
    </button>
{:else}
    <button 
        onclick={action} 
        class={`flex justify-center items-center px-5 py-1 grow transition-all duration-200 border rounded-md hover:cursor-pointer ${theme[type as keyof ThemeTypes]}`}
    >
        {@render children()}
    </button>
{/if}
