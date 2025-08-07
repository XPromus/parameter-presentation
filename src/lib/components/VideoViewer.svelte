<script lang="ts">
    import { GetMediaPath, type MediaData } from "$lib/MediaLoader";
    import { onMount } from "svelte";

    let { data, onFinish }: { data: MediaData, onFinish: any } = $props();
    let paused: boolean = $state(true);

    onMount(() => {
        paused = false;
    });
</script>

<div class="w-full block">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video onended={onFinish} bind:paused={paused} src={GetMediaPath(data)} autoplay controls></video>
</div>
