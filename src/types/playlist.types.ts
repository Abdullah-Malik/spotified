import { Track } from './track.types';
import { PaginationResponseProps } from './paginator.types';
import { ExternalUrls, Followers, Image, PaginationParams } from './shared.types';
import { Episode } from './episode.types';

interface Owner {
  external_urls?: ExternalUrls;
  followers?: Followers;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}

interface AddedBy {
  external_urls?: ExternalUrls;
  followers?: Followers;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}

interface PlaylistTrack {
  added_at?: string;
  added_by?: AddedBy;
  is_local?: boolean;
  track?: Track | Episode;
}

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: { items: PlaylistTrack[] } & PaginationResponseProps;
  type?: string;
  uri?: string;
}

export interface Playlist extends SimplifiedPlaylist {
  followers?: Followers;
}

export interface UserPlaylist extends PaginationResponseProps {
  items: Array<Omit<SimplifiedPlaylist, 'tracks'> & { tracks: { href: string; total: number } }>;
}

export interface FeaturedPlaylist {
  message?: string;
  playlists?: UserPlaylist;
}

export type CategoryPlaylist = FeaturedPlaylist;

export interface GetPlaylistOptionalParams {
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface ChangePlaylistDetailsOptionalParams {
  name?: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

export type CreatePlaylistOptionalParams = Omit<ChangePlaylistDetailsOptionalParams, 'name'>;

export interface GetPlaylistItemsOptionalParams extends PaginationParams {
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface AddItemsToPlaylistOptionalParams {
  uris?: string[];
  position?: number;
}

export interface PlaylistItems extends PaginationResponseProps {
  items: PlaylistTrack[];
}

export type PlaylistItemsResponse = { snapshot_id: string };

export type UpdatePlaylistItemsResponse = PlaylistItemsResponse;

export type AddItemsToPlaylistResponse = PlaylistItemsResponse;

export type RemovePlaylistItemsResponse = PlaylistItemsResponse;

export interface UpdatePlaylistItemsOptionalParams {
  uris: string[];
  range_start: number;
  insert_before: number;
  range_length: number;
  snapshot_id: string;
}

export interface RemovePlaylistItemsParams {
  tracks: Array<{ uri: string }>;
  snapshot_id?: string;
}

export type GetUserSavedPlaylistsOptionalParams = PaginationParams;

export type GetCategoryPlaylistOptionalParams = PaginationParams;

export interface GetFeaturedPlaylistOptionalParams extends PaginationParams {
  locale?: string;
}
