import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { 
  Artist as ArtistProfile,
  ArtistsAlbumPageResult,
  Artists as ArtistsProfile,
  Tracks as TracksDetail,
} from '../types';
import { joinIdsArrayToString } from '../utils';
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
   * Get Spotify catalog information for several artists based on their Spotify IDs
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
   */
  getArtists(ids: string[]) {
    return this.get<ArtistsProfile>(`/artists?ids=${joinIdsArrayToString(ids)}`);
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

  /**
   * Get Spotify catalog information about an artist's top tracks by country
   * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
   */
  getArtistTopTracks(id: string) {//also needs an optional param of market here
      return this.get<TracksDetail>(`/artist/${id}/top-tracks`);//unsure how to join market with this ??
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
   */
  getRelatedArtists(id: string) {
    return this.get<ArtistsProfile>(`/artists/${id}/related-artists`)
  }
}

export default Artist;
