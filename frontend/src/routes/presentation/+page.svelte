<script lang="ts">
    import ContentCarousel from '$lib/components/presentation/ContentCarousel.svelte';
    import type { SvelteComponent } from 'svelte';
    import type { PageProps } from './$types';
    import Icon from '@iconify/svelte';
    import Button from '$lib/components/interaction/Button.svelte';
    import Link from '$lib/components/interaction/Link.svelte';

    let { data }: PageProps = $props();

    let contentCarousel: SvelteComponent | undefined = $state();

    let autoplay: boolean = $state(true);
    let loop: boolean = $state(false);

    let showControls: boolean = $state(false);

    let videoPaused: boolean = $state(false);
    let videoLength: number = $state(0);
    let currentVideoTime: number = $state(0);

    let currentContentType: string = $state("");

    const getVideoTimeString = (): string => {
        const currentTimeDate = new Date(currentVideoTime * 1000);
        const finalTimeDate = new Date(videoLength * 1000);
        
        const options: Intl.DateTimeFormatOptions = {
            minute: "2-digit", 
            second: "2-digit" 
        };
        const currentTimeString = currentTimeDate.toLocaleTimeString("de-DE", options);
        const finalTimeString = finalTimeDate.toLocaleTimeString("de-DE", options);
        return currentTimeString + "/" + finalTimeString;
    }
</script>

<div class="absolute top-0 left-0 flex w-screen h-screen max-h-screen max-w-screen">
    <ContentCarousel 
        media={data.media} 
        loop={loop}
        bind:this={contentCarousel}
        bind:videoLength={videoLength} 
        bind:currentVideoTime={currentVideoTime} 
        bind:videoPaused={videoPaused} 
        bind:currentContentType={currentContentType} 
        autoplay={autoplay} 
    />
</div>

<div role="button" tabindex="0" onmouseleave={() => {showControls = false}} class="absolute bottom-0 left-0 z-20 flex items-center justify-center w-screen px-5 transition-opacity duration-200 opacity-0 bg-gray-900/90 hover:opacity-100">
    <div class="flex flex-row space-x-5">
        <Link href="/" type="neutral" tooltipOptions={{text: "Back to the startpage", position: "top"}}>
            {#snippet children()}
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            {/snippet}
        </Link>
        <Link href="/editor" type="neutral" tooltipOptions={{text: "Open the editor", position: "top"}}>
            <Icon icon="material-symbols:edit-rounded" width="24" height="24" />
        </Link>
    </div>
    {#if currentContentType == "image"}
        <div class="flex flex-row justify-center w-full p-5 space-x-5">
            <Button action={contentCarousel.onBack} type="neutral" tooltipOptions={{text: "Previous Image", position: "top"}}>
                {#snippet children()}
                    <Icon icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                {/snippet}
            </Button>
            {#if loop}
                <Button action={() => loop = !loop} type="success" tooltipOptions={{text: "Loop is enabled. Click to disable", position: "top"}}>
                    {#snippet children()}
                        <Icon icon="material-symbols:cached-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
            {:else}
                <Button action={() => loop = !loop} type="neutral" tooltipOptions={{text: "Loop is disabled. Click to enable", position: "top"}}>
                    {#snippet children()}
                        <Icon icon="material-symbols:cached-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
            {/if}
            {#if autoplay}
                <Button action={() => { autoplay = !autoplay }} type="success" tooltipOptions={{text: "Autoplay is enabled. Click to disable", position: "top"}}>
                    {#snippet children()}
                        <Icon icon="material-symbols:autoplay" width="24" height="24" />
                    {/snippet}
                </Button>
            {:else}
                <Button action={() => { autoplay = !autoplay }} type="neutral" tooltipOptions={{text: "Autoplay is disabled. Click to enable", position: "top"}}>
                    {#snippet children()}
                        <Icon icon="material-symbols:autoplay" width="24" height="24" />
                    {/snippet}
                </Button>
            {/if}
            <Button action={contentCarousel.onContinue} type="neutral" tooltipOptions={{text: "Next Image", position: "top"}}>
                {#snippet children()}
                    <Icon class="-scale-100" icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                {/snippet}
            </Button>
        </div>
    {:else if currentContentType == "video"}
        <div class="flex flex-col justify-center w-full p-5 space-x-5 space-y-5">
            <div class="flex flex-row w-full space-x-5">
                <input class="grow basis-10/12" type="range" bind:value={currentVideoTime} min="0" max={videoLength} name="" id="">
                <span class="p-2 font-bold text-center text-white rounded-md basis-2/12 bg-slate-500">
                    {getVideoTimeString()}
                </span>
            </div>
            <div class="flex flex-row justify-center w-full space-x-5">
                <Button action={contentCarousel.onBack} type="neutral" tooltipOptions={{text: "Previous Image", position: "top"}}>
                    {#snippet children()}
                        <Icon icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
                {#if loop}
                    <Button action={() => loop = !loop} type="success" tooltipOptions={{text: "Loop is enabled. Click to disable", position: "top"}}>
                        {#snippet children()}
                            <Icon icon="material-symbols:cached-rounded" width="24" height="24" />
                        {/snippet}
                    </Button>
                {:else}
                    <Button action={() => loop = !loop} type="neutral" tooltipOptions={{text: "Loop is disabled. Click to enable", position: "top"}}>
                        {#snippet children()}
                            <Icon icon="material-symbols:cached-rounded" width="24" height="24" />
                        {/snippet}
                    </Button>
                {/if}
                {#if autoplay}
                    <Button action={() => { autoplay = !autoplay }} type="success" tooltipOptions={{text: "Autoplay is enabled. Click to disable", position: "top"}}>
                        {#snippet children()}
                            <Icon icon="material-symbols:autoplay" width="24" height="24" />
                        {/snippet}
                    </Button>
                {:else}
                    <Button action={() => { autoplay = !autoplay }} type="neutral" tooltipOptions={{text: "Autoplay is disabled. Click to enable", position: "top"}}>
                        {#snippet children()}
                            <Icon icon="material-symbols:autoplay" width="24" height="24" />
                        {/snippet}
                    </Button>
                {/if}
                <Button action={() => videoPaused = !videoPaused} type="danger" tooltipOptions={{text: "Play/Pause Video", position: "top"}}>
                    {#snippet children()}
                        {#if videoPaused}
                            <Icon icon="material-symbols:play-arrow-rounded" width="24" height="24" />
                        {:else}
                            <Icon icon="material-symbols:pause-rounded" width="24" height="24" />
                        {/if}
                    {/snippet}
                </Button>
                <Button action={contentCarousel.onContinue} type="neutral" tooltipOptions={{text: "Next Image", position: "top"}}>
                    {#snippet children()}
                        <Icon class="-scale-100" icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
            </div>
        </div>
    {/if}
</div>
