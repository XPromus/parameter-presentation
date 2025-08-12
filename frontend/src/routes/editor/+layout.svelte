<script lang="ts">
    let { children } = $props();
</script>

<div class="w-screen h-screen bg-slate-900">
    {@render children?.()}
</div>
