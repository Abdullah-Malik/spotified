import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { ArtistProfile, ArtistsAlbumPageResult } from '../types';
import { SpotifiedPaginator } from '../paginators';
import { SimplifiedAlbum } from '../types/album.types';

export class Artist extends ReadWriteBaseClient {
  getArtist(id: string) {
    return this.get<ArtistProfile>(`/artists/${id}`);
  }

  getArtistAlbums(artistId: string) {
    return new SpotifiedPaginator<SimplifiedAlbum, ArtistsAlbumPageResult, { hello: string }>({
      endpoint: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      requestMaker: this._requestMaker,
      queryParams: {},
    });
  }
}

export default Artist;
