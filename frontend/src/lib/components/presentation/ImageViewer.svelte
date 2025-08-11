<script lang="ts">
    import { getMediaURL } from "$lib/api/mediaServerAPI";
    import type { MediaRecord } from "$lib/types/mediaTypes";

    let { data }: { data: MediaRecord } = $props();
</script>

<div class="flex items-center justify-center w-full">
    <img class="object-contain w-full h-full" src={getMediaURL(data)} alt="Image" />
</div>
