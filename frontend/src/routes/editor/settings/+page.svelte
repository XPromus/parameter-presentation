<script lang="ts">
    import { onMount } from "svelte";
    import { editorSettings } from "$lib/data/editorSettingsStore";

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

<div class="w-full h-full p-5 flex flex-col space-y-5">
    <div class="flex flex-row w-full">
        <a href="/editor" class="bg-gray-500 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200">
            {"< Back"}
        </a>
    </div>
    <div class="flex flex-row space-x-5 w-full">
        <span class="text-white">Default Duration (ms)</span>
        <input oninput={onDefaultDurationInput} bind:value={defaultDurationInput} class="grow bg-slate-200 rounded-md" type="number">
    </div>
</div>
