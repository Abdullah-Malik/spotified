import { ReadWriteBaseClient } from "client";
import { searchOptionalParams, searchResponse } from "types/search.types";
import joinIdsArrayToString from "utils";

export class Search extends ReadWriteBaseClient {
    searchForItem(q: string, type: string[], optionalParams?: searchOptionalParams){
        return this.get<searchResponse>(`/search`,{ q, type: joinIdsArrayToString(type), ...optionalParams });
    }
}