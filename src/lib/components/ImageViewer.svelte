<script lang="ts">
    import { GetMediaPath, type MediaData } from "$lib/MediaLoader";

    let { data }: { data: MediaData } = $props();
</script>

<div class="w-full">
    <img class="object-contain" src={GetMediaPath(data)} alt="Image" />
</div>
