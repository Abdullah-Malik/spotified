import { Artists } from './artist.types.js';
import { ExternalUrls, Followers, Image, PaginationParams, PaginationResponseProps } from './shared.types.js';
import { Tracks } from './track.types.js';

interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface UserProfile {
  display_name: string | null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface CurrentUserProfile extends UserProfile {
  country: string;
  email: string;
  product: string;
  explicit_content: ExplicitContent;
}

export type UsersTopItemsType = 'artists' | 'tracks';

export type FollowedArtistType = 'artist';

export type ArtistsUsersType = 'artist' | 'user';

export interface TopItemsOptionalParams extends PaginationParams {
  time_range?: 'long_term' | 'medium_term' | 'short_term';
}

export interface UsersTopItems extends PaginationResponseProps {
  items: Artists | Tracks;
}

export interface FollowedArtistOptionalParams {
  after?: string;
  limit?: number;
}

interface Cursors {
  after?: string;
  before?: string;
}

export interface FollowedArtist {
  artists: {
    href?: string;
    limit?: number;
    next?: string;
    cursors?: Cursors;
    total?: number;
    items?: Artists;
  };
}
