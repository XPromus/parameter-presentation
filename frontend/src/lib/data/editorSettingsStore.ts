import type { EditorSettings } from "$lib/types/settingsTypes";
import { writable } from "svelte/store";

export const editorSettings = writable<EditorSettings>({
    pocketbaseAddress: "http://127.0.0.1:8080",
    defaultDuration: 10000
});
