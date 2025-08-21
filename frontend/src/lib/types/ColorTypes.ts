import type { RecordResponse } from "./PocketbaseBaseTypes";

export type ColorRecord = ColorData & RecordResponse;

export type ColorData = {
    color: string,
    active: boolean,
}

export type ColorRecordUpdate = {
    color: string,
    active: boolean,
}

export type ColorCreateData = {
    color: string,
    active: boolean,
}
