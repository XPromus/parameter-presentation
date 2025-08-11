import type { EditorSettings } from "$lib/types/settingsTypes";
import { writable } from "svelte/store";

export const editorSettings = writable<EditorSettings>({
    defaultDuration: 10000
});
