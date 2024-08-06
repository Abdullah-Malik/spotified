import { ReadWriteBaseClient } from "../client/ReadWriteBaseClient";
import { searchOptionalParams, searchResponse } from "../types";
import joinIdsArrayToString from "../utils";

export class Search extends ReadWriteBaseClient {
    searchForItem(q: string, type: string[], optionalParams?: searchOptionalParams){
        return this.get<searchResponse>(`/search`,{ q, type: joinIdsArrayToString(type), ...optionalParams });
    }
}