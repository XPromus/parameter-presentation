<script lang="ts">
    import { GetMediaPath, type MediaData } from "$lib/MediaLoader";
    import { onMount } from "svelte";

    let { 
        data, 
        onFinish, 
        paused =$bindable(),
        videoLength = $bindable(),
        currentVideoTime = $bindable(), 
    }: { 
        data: MediaData, 
        onFinish: any, 
        paused: boolean,
        videoLength: number,
        currentVideoTime: number, 
    } = $props();

    let isPaused: boolean = $state(false);

    export const onPlayPause = () => {
        isPaused = !isPaused;
    }

    onMount(() => {
        paused = false;
    });
</script>

<div class="w-full flex items-center justify-center">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video class="w-full h-full object-contain" onended={onFinish} bind:paused={paused} bind:currentTime={currentVideoTime} bind:duration={videoLength} src={GetMediaPath(data)} autoplay></video>
</div>
