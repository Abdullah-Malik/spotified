import { Artists } from "./artist.types";
import { PaginationResponseProps } from "./paginator.types";
import { ExternalUrls, Followers, Image, PaginationParams } from "./shared.types";
import { Tracks } from "./track.types";

interface ExplicitContent {
  filterEnabled: boolean;
  filterLocked: boolean;
}

export interface UserProfile {
  display_name: string | null;
  externalUrls: ExternalUrls;
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
  explicitContent: ExplicitContent;
}

export interface TopItemsOptionalParams extends PaginationParams {
  timeRange?: string;
}

export interface UsersTopItems extends PaginationResponseProps {
  artists?: Artists;  
  tracks?: Tracks;
}

export interface FollowedArtistOptionalParams {
  after?: string;
  limit?: string;
}

