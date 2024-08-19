import {
  Copyright,
  ExternalIds,
  ExternalUrls,
  Image,
  OptionalParams,
  PaginationParams,
  Restrictions,
} from './shared.types';
import { SimplifiedArtist } from './artist.types';
import { PaginationResponseProps } from './paginator.types';
import { SimplifiedTrack } from './track.types';

export interface SimplifiedAlbum {
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
  restrictions?: Restrictions;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface AlbumTracks extends PaginationResponseProps {
  items: SimplifiedTrack[];
}

export interface Album extends SimplifiedAlbum {
  tracks: AlbumTracks;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
}

export type GetAlbumOptionalParams = OptionalParams;

export interface GetAlbumTracksOptionalParams extends PaginationParams {
  market?: string;
}

export type GetUserSavedAlbumsOptionalParams = GetAlbumTracksOptionalParams;

interface SavedAlbum {
  added_at?: string;
  album?: Album;
}

export interface UserSavedAlbum extends PaginationResponseProps {
  items: SavedAlbum[];
}

export interface PagedAlbums extends PaginationResponseProps {
  items: SimplifiedAlbum[];
}

export type GetNewReleasesOptionalParams = PaginationParams;
