import { SimplifiedAlbum } from './album.types';
import { PageResult } from './paginator.types';
import { ExternalUrls, Image } from './shared.types';

export interface SimplifiedArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ArtistProfile extends SimplifiedArtist {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
}

export type ArtistsAlbumPageResult = PageResult<SimplifiedAlbum>;
