<script lang="ts">
    import { getMediaURL } from "$lib/api/MediaServerAPI";
    import type { MediaRecord } from "$lib/types/MediaTypes";
    import { onMount } from "svelte";

    let { 
        data, 
        onFinish, 
        paused =$bindable(),
        videoLength = $bindable(),
        currentVideoTime = $bindable(), 
    }: { 
        data: MediaRecord, 
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

<div class="flex justify-center w-full max-h-full min-w-0 min-h-0">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video class="object-contain h-full" onended={onFinish} bind:paused={paused} bind:currentTime={currentVideoTime} bind:duration={videoLength} src={getMediaURL(data)} autoplay></video>
</div>
