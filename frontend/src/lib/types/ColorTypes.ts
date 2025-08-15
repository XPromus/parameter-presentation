import type { RecordResponse } from "./PocketbaseBaseTypes";

export type ColorRecord = ColorData & RecordResponse;

export type ColorData = {
    color: string,
}

export type ColorRecordUpdate = {
    color: string
}

export type ColorCreateData = {
    color: string
}
