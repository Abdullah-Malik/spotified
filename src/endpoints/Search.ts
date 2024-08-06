import { ReadWriteBaseClient } from "client";
import { searchOptionalParams } from "types/search.types";

export class Search extends ReadWriteBaseClient {
    searchForItem(q: string, type: string[], optionalParams?: searchOptionalParams){
        return this.get<>();
    }
}