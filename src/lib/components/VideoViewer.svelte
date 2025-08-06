<script lang="ts">
    import type { VideoData } from "$lib/types/ContentTypes";
    import { onMount } from "svelte";

    let { data, onFinish }: { data: VideoData, onFinish: any } = $props();
    let paused: boolean = $state(true);

    onMount(() => {
        paused = false;
    });
</script>

<div class="w-full block">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video onended={onFinish} bind:paused={paused} src={data.path} autoplay controls></video>
</div>
