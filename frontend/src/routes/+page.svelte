<script lang="ts">
    import ContentCarousel from "$lib/components/ContentCarousel.svelte";
    import { ContentType } from "$lib/MediaLoader";
    import type { SvelteComponent } from "svelte"; 

    let contentCarousel: SvelteComponent | undefined = $state();

    let autoplay: boolean = $state(true);
    let showControls: boolean = $state(false);

    let currentContentType: ContentType = $state(ContentType.IMAGE);
    let videoPaused: boolean = $state(false);
    let videoLength: number = $state(0);
    let currentVideoTime: number = $state(0);

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

<div class="w-screen h-screen flex flex-col absolute top-0 left-0">
    <div class="grow flex flex-col">
        <ContentCarousel bind:videoLength={videoLength} bind:currentVideoTime={currentVideoTime} bind:videoPaused={videoPaused} bind:currentContentType={currentContentType} bind:this={contentCarousel} autoplay={autoplay} />
    </div>
</div>

<div role="button" tabindex="0" onmouseleave={() => {showControls = false}} class="absolute bottom-0 left-0 z-20 bg-slate-200/40 flex items-center justify-center w-screen opacity-0 hover:opacity-100 transition-opacity duration-200">
    {#if currentContentType == ContentType.IMAGE}
        <div class="flex flex-row space-x-5 p-5 w-full justify-center">
            <button onclick={contentCarousel.onBack} class="grow bg-slate-300 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200">
                {"<"}
            </button>
            {#if autoplay}
                <button onclick={() => autoplay = !autoplay} class="bg-red-500 px-5 py-1 w-50 rounded-md hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-200">
                    Turn Autoplay Off
                </button>
            {:else}
                <button onclick={() => autoplay = !autoplay} class="bg-green-500 px-5 py-1 w-50 rounded-md hover:cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-200">
                    Turn Autoplay On
                </button>
            {/if}
            <button onclick={contentCarousel.onContinue} class="grow bg-slate-300 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200">
                {">"}
            </button>
        </div>
    {:else if currentContentType == ContentType.VIDEO}
        <div class="flex flex-col space-x-5 p-5 w-full justify-center space-y-5">
            <div class="flex flex-row space-x-5 w-full">
                <input class="grow basis-10/12" type="range" bind:value={currentVideoTime} min="0" max={videoLength} name="" id="">
                <span class="basis-2/12 text-center p-2 text-white font-bold bg-slate-500 rounded-md">
                    {getVideoTimeString()}
                </span>
            </div>
            <div class="flex flex-row space-x-5 w-full justify-center">
                <button onclick={contentCarousel.onBack} class="grow bg-slate-300 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200">
                    {"<"}
                </button>
                {#if autoplay}
                    <button onclick={() => autoplay = !autoplay} class="bg-red-500 px-5 py-1 w-50 rounded-md hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-200">
                        Turn Autoplay Off
                    </button>
                {:else}
                    <button onclick={() => autoplay = !autoplay} class="bg-green-500 px-5 py-1 w-50 rounded-md hover:cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-200">
                        Turn Autoplay On
                    </button>
                {/if}
                <button onclick={() => videoPaused = !videoPaused} class="bg-slate-300 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200">
                    {#if videoPaused}
                        Play Video
                    {:else}
                        Pause Video
                    {/if}
                </button>
                <button onclick={contentCarousel.onContinue} class="grow bg-slate-300 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200">
                    {">"}
                </button>
            </div>
        </div>
    {/if}
</div>
