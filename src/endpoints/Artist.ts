import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { Artist as ArtistProfile, ArtistsAlbumPageResult } from '../types';
import { SpotifiedPaginator } from '../paginators';
import { SimplifiedAlbum } from '../types/album.types';

export class Artist extends ReadWriteBaseClient {
    /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID
   * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
   */
  getArtist(id: string) {
    return this.get<ArtistProfile>(`/artists/${id}`);
  }

  /**
   * Get Spotify catalog information about an artist's albums
   * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
   */
  getArtistAlbums(artistId: string) {
    return new SpotifiedPaginator<SimplifiedAlbum, ArtistsAlbumPageResult, { hello: string }>({
      endpoint: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      requestMaker: this._requestMaker,
      queryParams: {},
    });
  }
}

export default Artist;
