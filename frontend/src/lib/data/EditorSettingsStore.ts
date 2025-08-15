import type { EditorSettings } from "$lib/types/SettingsTypes";
import { writable } from "svelte/store";

export const editorSettings = writable<EditorSettings>({
    pocketbaseAddress: `http://${window.location.hostname}:8080/`,
    defaultDuration: 10000
});
