<script lang="ts">
    import { getMediaURL } from "$lib/api/MediaServerAPI";
    import type { MediaRecord } from "$lib/types/MediaTypes";

    let { data }: { data: MediaRecord } = $props();
</script>

<div class="flex justify-center w-full max-h-full min-w-0 min-h-0">
    <img class="object-contain h-full" src={getMediaURL(data)} alt="Image" />
</div>
