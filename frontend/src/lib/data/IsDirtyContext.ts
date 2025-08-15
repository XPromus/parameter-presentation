import { getContext, setContext } from "svelte";

export const IS_DIRTY_KEY: string = "is_dirty";

export const setIsDirty = (value: boolean) => {
    setContext<boolean>(IS_DIRTY_KEY, value);
}

export const getIsDirty = (): boolean => {
    return getContext<boolean>(IS_DIRTY_KEY);
}
