<script lang="ts">
    import { onMount } from "svelte";
    import { editorSettings } from "$lib/data/EditorSettingsStore";
    import Link from "$lib/components/interaction/Link.svelte";
    import Input from "$lib/components/interaction/Input.svelte";
    import Icon from "@iconify/svelte";
    import Button from "$lib/components/interaction/Button.svelte";

    let defaultDurationInput: number = $state(0);
    let pocketbaseAddressInput: string=  $state($editorSettings.pocketbaseAddress);

    const onApply = () => {
        editorSettings.set({
            pocketbaseAddress: pocketbaseAddressInput,
            defaultDuration: defaultDurationInput
        });
    }

    onMount(() => {
        defaultDurationInput = $editorSettings.defaultDuration;
    });
</script>

<div class="flex flex-col w-full h-fit p-5 space-y-5">
    <div class="flex flex-row space-x-5 w-full">
        <Link href="/" type="neutral" tooltipOptions={{text: "Back to the startpage", position: "bottom"}}>
            {#snippet children()}
                <Icon icon="material-symbols:home-rounded" width="24" height="24" />
            {/snippet}
        </Link>
        <Link href="/editor" type="neutral" tooltipOptions={{text: "Back to the editor", position: "bottom"}}>
            {#snippet children()}
                <Icon icon="material-symbols:edit-rounded" width="24" height="24" />
            {/snippet}
        </Link>
    </div>
    <div class="flex flex-row w-full space-x-5">
        <span class="text-white">Pocketbase Address</span>
        <Input bind:value={pocketbaseAddressInput} placeholder="Pocketbase Address" type="text" />
    </div>
    <div class="flex flex-row w-full space-x-5">
        <span class="text-white">Default Duration (ms)</span>
        <Input bind:value={defaultDurationInput} placeholder="Duration in ms" type="number" />
    </div>
    <Button action={onApply} type="success">
        {#snippet children()}
            <span>Apply</span>
        {/snippet}
    </Button>
</div>
