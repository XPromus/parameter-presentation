<script lang="ts">
    let { text }: { text: string } = $props();
</script>

<button class="bg-slate-500 p-5 rounded-2xl hover:cursor-pointer hover:bg-slate-700 hover:text-white">
    {text}
</button>
