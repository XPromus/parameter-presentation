<script lang="ts">
    import { onMount } from "svelte";
    import { editorSettings } from "$lib/data/editorSettingsStore";
    import Link from "$lib/components/interaction/Link.svelte";
    import Input from "$lib/components/interaction/Input.svelte";

    let defaultDurationInput: number = $state(0);

    const onDefaultDurationInput = () => {
        editorSettings.update((value) => {
            return {
                defaultDuration: defaultDurationInput
            }
        });
    }

    onMount(() => {
        defaultDurationInput = $editorSettings.defaultDuration;
    })
</script>

<div class="flex flex-col w-full h-full p-5 space-y-5">
    <div class="flex flex-row w-full">
        <Link href="/editor" type="neutral">
            {#snippet children()}
                {"< Back"}
            {/snippet}
        </Link>
    </div>
    <div class="flex flex-row w-full space-x-5">
        <span class="text-white">Default Duration (ms)</span>
        <Input onChange={onDefaultDurationInput} bind:value={defaultDurationInput} placeholder="Duration in ms" type="number" />
    </div>
</div>
