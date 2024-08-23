import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import { SearchOptionalParams, SearchResponse } from '../types/index.js';
import joinIdsArrayToString from '../utils.js';

export class Search extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or
   * audiobooks that match a keyword string.
   * https://developer.spotify.com/documentation/web-api/reference/search
   */
  searchForItem(q: string, type: string[], optionalParams?: SearchOptionalParams) {
    return this.get<SearchResponse>(`/search`, {
      q: encodeURIComponent(q),
      type: joinIdsArrayToString(type),
      ...optionalParams,
    });
  }
}

export default Search;
