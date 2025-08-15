import type { PresentationSettings } from "$lib/types/PresentationSettingsTypes";
import { writable } from "svelte/store";

export const presentationSettings = writable<PresentationSettings>({
    autoplay: true,
    loop: true
})
