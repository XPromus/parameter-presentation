<script lang="ts">
    import { GetImagePaths } from "$lib/components/ImageImport";

    import image1 from "$lib/assets/images/1.jpg";
    import image2 from "$lib/assets/images/2.jpg";
    import video1 from "$lib/assets/videos/video.mp4";

    import type { ImageViewData } from "$lib/types/ContentTypes";
    import type { VideoData } from "$lib/types/ContentTypes";
    import ContentCarousel from "$lib/components/ContentCarousel.svelte";
    import type { SvelteComponent } from "svelte";
    
    const images: ImageViewData[] = [ 
        { index: 0, path: image1, duration: 4000 },
        { index: 1, path: image2, duration: 4000 },
        { index: 3, path: image2, duration: 4000 }
    ];

    const videos: VideoData[] = [
        { index: 2, path: video1 }
    ];

    let contentCarousel: SvelteComponent | undefined = $state();

    let autoplay: boolean = $state(true);
    let showControls: boolean = $state(false);
</script>

<div class="w-screen h-screen flex flex-col">
    <div class="grow bg-red-200 flex flex-col">
        <ContentCarousel bind:this={contentCarousel} images={images} videos={videos} autoplay={autoplay} />
    </div>
</div>

<div class="absolute bottom-0 left-0 z-20 bg-blue-200 flex flex-col items-center justify-center space-y-5 w-screen">
    <button onclick={() => showControls = !showControls} class="p-1 bg-slate-300 hover:bg-slate-500 w-full">
        {#if showControls}
            Close Controls
        {:else}
            Open Controls
        {/if}
    </button>
    {#if showControls}
        <div class="flex flex-row space-x-5 pb-2">
            <button onclick={contentCarousel.onBack} class="bg-slate-500 p-5 rounded-2xl hover:cursor-pointer hover:bg-slate-700 hover:text-white">
                Back
            </button>
            <button onclick={() => autoplay = !autoplay} class="bg-slate-500 p-5 rounded-2xl hover:cursor-pointer hover:bg-slate-700 hover:text-white">
                {#if autoplay}
                    Pause
                {:else}
                    Play
                {/if}
            </button>
            <button onclick={contentCarousel.onContinue} class="bg-slate-500 p-5 rounded-2xl hover:cursor-pointer hover:bg-slate-700 hover:text-white">
                Forward
            </button>
        </div>
    {/if}
</div>
