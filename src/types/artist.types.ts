import { PaginationResponseProps } from './paginator.types';
import { ExternalUrls, Followers, Image, PaginationParams, Restrictions } from './shared.types';

export interface SimplifiedArtist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}
export interface Artist extends SimplifiedArtist {
  followers?: Followers;
  genres?: string[];
  images?: Image[];
  popularity?: number;
}

export interface Artists {
  artists: Artist[];
}


export interface OptionalArtistAlbumParams extends PaginationParams {
  includeGroups?: string;
  market?: string;
}

interface SimplifiedArtistAlbum {
  album_group: string;
  album_type: string;
  artists: SimplifiedArtist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}

export interface ArtistAlbumResult extends PaginationResponseProps {
  items: SimplifiedArtistAlbum[];
}
