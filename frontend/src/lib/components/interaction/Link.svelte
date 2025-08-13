<script lang="ts">
    import theme from "$lib/theme/theme.json";
    import type { ThemeTypes } from "$lib/theme/themeTypes";

    let {
        href,
        type,
        disabled = false,
        classes = "",
        children,
    }: {
        href: any,
        type: string,
        disabled?: boolean,
        classes?: string,
        children: any,
    } = $props();
</script>

{#if disabled}
    <a href="#" class={`flex justify-center px-5 py-1 text-center duration-200 rounded-md opacity-50 ${theme[`${type}Disabled` as keyof ThemeTypes]} ${classes}`}>
        {@render children()}
    </a>
{:else}
    <a href={href} class={`flex justify-center px-5 py-1 text-center duration-200 rounded-md ${theme[type as keyof ThemeTypes]}`}>
        {@render children()}
    </a>
{/if}
