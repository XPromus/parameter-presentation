<script lang="ts">
    import { GetMediaPath, type MediaData } from "$lib/MediaLoader";

    let { data }: { data: MediaData } = $props();
</script>

<div class="w-full flex items-center justify-center">
    <img class="w-full h-full object-contain" src={GetMediaPath(data)} alt="Image" />
</div>
