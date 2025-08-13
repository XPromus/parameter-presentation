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
        <Link href="/" type="neutral">
            {#snippet children()}
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            {/snippet}
        </Link>
        <Link href="/editor" type="neutral">
            <Icon icon="material-symbols:edit-rounded" width="24" height="24" />
        </Link>
    </div>
    {#if currentContentType == "image"}
        <div class="flex flex-row justify-center w-full p-5 space-x-5">
            <Button action={contentCarousel.onBack} type="neutral">
                {#snippet children()}
                    <Icon icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                {/snippet}
            </Button>
            {#if autoplay}
                <Button action={() => { autoplay = !autoplay }} type="success">
                    {#snippet children()}
                        <span>Turn Autoplay Off</span>
                    {/snippet}
                </Button>
            {:else}
                <Button action={() => { autoplay = !autoplay }} type="success">
                    {#snippet children()}
                        <span>Turn Autoplay On</span>
                    {/snippet}
                </Button>
            {/if}
            <Button action={contentCarousel.onContinue} type="neutral">
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
                <Button action={contentCarousel.onBack} type="neutral">
                    {#snippet children()}
                        <Icon icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
                {#if autoplay}
                    <Button action={() => { autoplay = !autoplay }} type="success">
                        {#snippet children()}
                            <span>Turn Autoplay Off</span>
                        {/snippet}
                    </Button>
                {:else}
                    <Button action={() => { autoplay = !autoplay }} type="success">
                        {#snippet children()}
                            <span>Turn Autoplay On</span>
                        {/snippet}
                    </Button>
                {/if}
                <Button action={() => videoPaused = !videoPaused} type="danger">
                    {#snippet children()}
                        {#if videoPaused}
                            <Icon icon="material-symbols:play-arrow-rounded" width="24" height="24" />
                        {:else}
                            <Icon icon="material-symbols:pause-rounded" width="24" height="24" />
                        {/if}
                    {/snippet}
                </Button>
                <Button action={contentCarousel.onContinue} type="neutral">
                    {#snippet children()}
                        <Icon class="-scale-100" icon="material-symbols:arrow-back-2-rounded" width="24" height="24" />
                    {/snippet}
                </Button>
            </div>
        </div>
    {/if}
</div>
