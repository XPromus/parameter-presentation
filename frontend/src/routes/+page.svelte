<script lang="ts">
    import Link from "$lib/components/startpage/Link.svelte";
</script>

<div class="flex flex-row w-screen h-screen p-10 space-x-10">
    <Link href="/presentation" text="Presentation" />
    <div class="flex flex-col space-y-10 basis-1/2">
        <Link href="/editor" text="Editor" />
        <Link href="/docs" text="Documentation"/>
    </div>
</div>
