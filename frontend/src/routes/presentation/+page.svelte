<script lang="ts">
    import ContentCarousel from '$lib/components/presentation/ContentCarousel.svelte';
    import type { SvelteComponent } from 'svelte';
    import type { PageProps } from './$types';

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

<div class="absolute top-0 left-0 flex flex-col w-screen h-screen">
    <div class="flex flex-col grow">
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
</div>

<div role="button" tabindex="0" onmouseleave={() => {showControls = false}} class="absolute bottom-0 left-0 z-20 flex items-center justify-center w-screen px-5 transition-opacity duration-200 opacity-0 bg-slate-200/40 hover:opacity-100">
    <a href="/editor" class="px-5 py-1 text-center transition-all duration-200 bg-gray-400 rounded-md grow hover:cursor-pointer hover:bg-gray-600 hover:text-white">
        Edit
    </a>
    {#if currentContentType == "image"}
        <div class="flex flex-row justify-center w-full p-5 space-x-5">
            <button onclick={contentCarousel.onBack} class="py-1 transition-all duration-200 rounded-md grow bg-slate-300 hover:cursor-pointer hover:bg-slate-500 hover:text-white">
                {"<"}
            </button>
            {#if autoplay}
                <button onclick={() => autoplay = !autoplay} class="px-5 py-1 transition-all duration-200 bg-red-500 rounded-md w-50 hover:cursor-pointer hover:bg-red-700 hover:text-white">
                    Turn Autoplay Off
                </button>
            {:else}
                <button onclick={() => autoplay = !autoplay} class="px-5 py-1 transition-all duration-200 bg-green-500 rounded-md w-50 hover:cursor-pointer hover:bg-green-700 hover:text-white">
                    Turn Autoplay On
                </button>
            {/if}
            <button onclick={contentCarousel.onContinue} class="px-5 py-1 transition-all duration-200 rounded-md grow bg-slate-300 hover:cursor-pointer hover:bg-slate-500 hover:text-white">
                {">"}
            </button>
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
                <button onclick={contentCarousel.onBack} class="py-1 transition-all duration-200 rounded-md grow bg-slate-300 hover:cursor-pointer hover:bg-slate-500 hover:text-white">
                    {"<"}
                </button>
                {#if autoplay}
                    <button onclick={() => autoplay = !autoplay} class="px-5 py-1 transition-all duration-200 bg-red-500 rounded-md w-50 hover:cursor-pointer hover:bg-red-700 hover:text-white">
                        Turn Autoplay Off
                    </button>
                {:else}
                    <button onclick={() => autoplay = !autoplay} class="px-5 py-1 transition-all duration-200 bg-green-500 rounded-md w-50 hover:cursor-pointer hover:bg-green-700 hover:text-white">
                        Turn Autoplay On
                    </button>
                {/if}
                <button onclick={() => videoPaused = !videoPaused} class="px-5 py-1 transition-all duration-200 rounded-md bg-slate-300 hover:cursor-pointer hover:bg-slate-500 hover:text-white">
                    {#if videoPaused}
                        Play Video
                    {:else}
                        Pause Video
                    {/if}
                </button>
                <button onclick={contentCarousel.onContinue} class="px-5 py-1 transition-all duration-200 rounded-md grow bg-slate-300 hover:cursor-pointer hover:bg-slate-500 hover:text-white">
                    {">"}
                </button>
            </div>
        </div>
    {/if}
</div>
