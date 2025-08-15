<script lang="ts">
    import Link from "$lib/components/interaction/Link.svelte";
    import Icon from "@iconify/svelte";
</script>

<div class="w-full h-full flex flex-col space-y-5 justify-center items-center">
    <span class="text-white">Error when loading the presentation data. Pocketbase is probably not running or the address in settings wasn't configured correctly</span>
    <Link href="/editor/settings" type="neutral" tooltipOptions={{text: "Open Settings", position: "top"}}>
        {#snippet children()}
            <Icon icon="material-symbols:settings" width="24" height="24" />
        {/snippet}
    </Link>
    <Link href="/" type="neutral" tooltipOptions={{text: "Back to the startpage", position: "top"}}>
        {#snippet children()}
            <Icon icon="material-symbols:home-rounded" width="24" height="24" />
        {/snippet}
    </Link>
</div>
