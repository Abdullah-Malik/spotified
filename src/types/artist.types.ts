import { SimplifiedAlbum } from './album.types';
import { PageResult } from './paginator.types';
import { ExternalUrls, Image } from './shared.types';

export interface SimplifiedArtist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}
export interface Artist extends SimplifiedArtist {
  followers?: {
    href?: string | null;
    total?: number;
  };
  genres?: string[];
  images?: Image[];
  popularity?: number;
}

export interface Artists {
  artists: Artist[];
}

export type ArtistsAlbumPageResult = PageResult<SimplifiedAlbum>;
