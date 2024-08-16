import { Artists } from './artist.types';
import { PaginationResponseProps } from './paginator.types';
import { ExternalUrls, Followers, Image, PaginationParams } from './shared.types';
import { Tracks } from './track.types';

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
  limit?: string;
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
