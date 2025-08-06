<script lang="ts">
    import { ContentType, type ImageViewData, type VideoData } from "$lib/types/ContentTypes";
    import { onMount } from "svelte";
    import ImageViewer from "./ImageViewer.svelte";
    import VideoViewer from "./VideoViewer.svelte";

    let { images, videos, autoplay }: { images: ImageViewData[], videos: VideoData[], autoplay: boolean } = $props();

    let currentContentType: ContentType = $state(ContentType.IMAGE);
    let currentImage: ImageViewData | undefined = $state();
    let currentVideo: VideoData | undefined = $state();

    let elapsed = $state(0);
    let currentIndex = $state(0);

    const onStart = () => {
        setContentTypeForCurrentIndex();
    }

    const onVideoFinish = () => {
        if (autoplay){
            onContinue();
        }
    }

    export const onBack = () => {
        console.log("Back");
        if (currentIndex > 0) {
            currentIndex--;
            setContentTypeForCurrentIndex();
        }
    }

    export const onContinue = () => {
        console.log("Continue");
        const maxIndex = images.length + videos.length - 1;
        if (currentIndex < maxIndex){
            currentIndex++;
            setContentTypeForCurrentIndex();
        }
    }

    const setContentTypeForCurrentIndex = () => {
        images.forEach(element => {
            if (element.index == currentIndex) {
                currentImage = element;
                currentContentType = ContentType.IMAGE;
                return;
            }
        });

        videos.forEach(element => {
            if (element.index == currentIndex) {
                currentVideo = element;
                currentContentType = ContentType.VIDEO;
                return;
            }
        })
    }

    onMount(() => {
        onStart();

        let lastTime = performance.now();
        let frame = requestAnimationFrame(function update(time) {
            frame = requestAnimationFrame(update);

            if (currentContentType == ContentType.IMAGE && autoplay) {
                elapsed += Math.min(time - lastTime, currentImage!!.duration - elapsed);
                lastTime = time;

                if (elapsed >= currentImage!!.duration) {
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

<div>
    {#if currentContentType == ContentType.IMAGE && currentImage != undefined}
        <ImageViewer data={currentImage}/>
    {:else if currentContentType == ContentType.VIDEO && currentVideo != undefined}
        <VideoViewer data={currentVideo} onFinish={onVideoFinish}/>
    {/if}
</div>
