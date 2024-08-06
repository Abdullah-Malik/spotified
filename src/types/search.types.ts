import { Track } from "endpoints";
import { PaginationParams } from "./shared.types";

export interface searchOptionalParams extends PaginationParams{
    market?: string;
    includeExternal?: string;
}

export interface searchResponse {
    track?: Track;
    
}