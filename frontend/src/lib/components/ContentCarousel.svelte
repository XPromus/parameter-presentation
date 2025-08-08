<script lang="ts">
    import { ContentType, GetAllMedia } from "$lib/MediaLoader";
    import { onMount, type SvelteComponent } from "svelte";
    import ImageViewer from "./ImageViewer.svelte";
    import VideoViewer from "./VideoViewer.svelte";
    import { GetMediaDataAtIndex, type MediaData } from "$lib/MediaLoader";

    let { 
        autoplay, 
        currentContentType = $bindable(),
        videoPaused = $bindable(),
        videoLength = $bindable(),
        currentVideoTime = $bindable(), 
    }: { 
        autoplay: boolean, 
        currentContentType: ContentType,
        videoPaused: boolean,
        videoLength: number,
        currentVideoTime: number, 
    } = $props();

    let currentContent: MediaData | undefined = $state();

    let elapsed = $state(0);
    let currentIndex = $state(0);

    let videoViewer: SvelteComponent | undefined = $state();

    const onStart = () => {
        setContentTypeForCurrentIndex();
    }

    const onVideoFinish = () => {
        if (autoplay){
            onContinue();
        }
    }

    export const onBack = () => {
        if (currentIndex > 0) {
            elapsed = 0;
            currentIndex--;
            setContentTypeForCurrentIndex();
        }
    }

    export const onContinue = () => {
        if (currentIndex < GetAllMedia().length - 1){
            elapsed = 0;
            currentIndex++;
            setContentTypeForCurrentIndex();
        }
    }

    export const onPausePlayClicked = () => {
        switch(currentContentType){
            case ContentType.IMAGE:
                autoplay = !autoplay;
                break;
            case ContentType.VIDEO:
                videoViewer!!.onPlayPause;
                break;
        }
    } 

    const setContentTypeForCurrentIndex = () => {
        console.log(currentIndex);
        currentContent = GetMediaDataAtIndex(currentIndex);
        switch(currentContent.type) {
            case "image":
                currentContentType = ContentType.IMAGE;
                break;
            case "video":
                currentContentType = ContentType.VIDEO;
                break;
        }
    }

    onMount(() => {
        onStart();

        let lastTime = window.performance.now();
        let frame = requestAnimationFrame(function update(time) {
            frame = requestAnimationFrame(update);
            if (currentContentType == ContentType.IMAGE && autoplay) {
                elapsed += Math.min(time - lastTime, currentContent!!.duration - elapsed);
                lastTime = time;

                if (elapsed >= currentContent!!.duration) {
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

<div class="w-full h-full flex justify-center items-center">
    {#if currentContent != undefined}
        {#if currentContentType == ContentType.IMAGE}
            <ImageViewer data={currentContent}/>
        {:else if currentContentType == ContentType.VIDEO}
            <VideoViewer bind:videoLength={videoLength} bind:currentVideoTime={currentVideoTime} bind:paused={videoPaused} bind:this={videoViewer} data={currentContent} onFinish={onVideoFinish}/>
        {/if}
    {/if}
</div>
