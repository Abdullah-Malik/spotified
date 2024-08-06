import { PaginationParams } from "./shared.types";

export interface searchOptionalParams extends PaginationParams{
    market?: string;
    includeExternal?: string;
}