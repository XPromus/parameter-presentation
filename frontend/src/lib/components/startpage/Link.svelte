<script lang="ts">
    let {
        href,
        text
    }: {
        href: string,
        text: string
    } = $props();
</script>

<a href={href} class="flex items-center justify-center w-full h-full transition-all duration-150 rounded-md drop-shadow-md drop-shadow-black bg-slate-500/50 basis-1/2 hover:bg-slate-700/50 hover:cursor-pointer active:bg-slate-900/50">
    <span class="text-5xl font-bold text-white">{text}</span>
</a>
