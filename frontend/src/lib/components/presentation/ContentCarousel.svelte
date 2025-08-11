<script lang="ts">
    import type { MediaRecord } from "$lib/types/mediaTypes";
    import { onMount, type SvelteComponent } from "svelte";
    import ImageViewer from "./ImageViewer.svelte";
    import VideoViewer from "./VideoViewer.svelte";

    let {
        media,
        autoplay,
        videoPaused = $bindable(),
        videoLength = $bindable(),
        currentVideoTime = $bindable(), 
        currentContentType = $bindable(),
    }: {
        media: MediaRecord[],
        autoplay: boolean,
        videoPaused: boolean,
        videoLength: number,
        currentVideoTime: number, 
        currentContentType: string,
    } = $props();

    let currentMediaIndex: number = $state(0);
    let elapsed: number = $state(0);

    let imageViewer: SvelteComponent | undefined = $state();
    let videoViewer: SvelteComponent | undefined = $state();

    const onVideoFinish = () => {
        if (autoplay){
            onContinue();
        }
    }

    export const onBack = () => {
        if (currentMediaIndex > 0) {
            elapsed = 0;
            currentMediaIndex--;
            currentContentType = media[currentMediaIndex].type;
        }
    }

    export const onContinue = () => {
        if (currentMediaIndex < media.length - 1){
            elapsed = 0;
            currentMediaIndex++;
            currentContentType = media[currentMediaIndex].type;
        }
    }

    export const onPausePlayClicked = () => {
        switch(media[currentMediaIndex].type){
            case "image":
                autoplay = !autoplay;
                break;
            case "video":
                videoViewer!!.onPlayPause;
                break;
        }
    } 

    onMount(() => {
        currentContentType = media[currentMediaIndex].type;

        let lastTime = window.performance.now();
        let frame = requestAnimationFrame(function update(time) {
            frame = requestAnimationFrame(update);
            if (media[currentMediaIndex].type == "image" && autoplay) {
                elapsed += Math.min(time - lastTime, media[currentMediaIndex].duration - elapsed);
                lastTime = time;

                if (elapsed >= media[currentMediaIndex].duration) {
                    onContinue();
                    elapsed = 0;
                };
            }
        });
        return () => {
            cancelAnimationFrame(frame);
        }
    })
</script>

<div class="flex items-center justify-center w-full h-full">
    {#if media[currentMediaIndex].type == "image"}
        <ImageViewer bind:this={imageViewer} data={media[currentMediaIndex]} />
    {:else if media[currentMediaIndex].type == "video"}
        <VideoViewer bind:this={videoViewer} bind:videoLength={videoLength} bind:currentVideoTime={currentVideoTime} bind:paused={videoPaused} data={media[currentMediaIndex]} onFinish={onVideoFinish} />
    {/if}
</div>
