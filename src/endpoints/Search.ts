import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { searchOptionalParams, searchResponse } from '../types';
import joinIdsArrayToString from '../utils';

export class Search extends ReadWriteBaseClient {
    /**
     * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
     * https://developer.spotify.com/documentation/web-api/reference/search
     */
    searchForItem(q: string, type: string[], optionalParams?: searchOptionalParams){
        return this.get<searchResponse>(`/search`,{ q, type: joinIdsArrayToString(type), ...optionalParams });
    }
}