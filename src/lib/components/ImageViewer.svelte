<script lang="ts">
    import type { ImageViewData } from "$lib/types/ContentTypes";

    let { data }: { data: ImageViewData } = $props();
</script>

<div class="w-full">
    <img src={data.path} alt="Image" />
</div>
