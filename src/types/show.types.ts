import { SimplifiedEpisode } from './episode.types';
import {
  Copyright,
  ExternalUrls,
  Image,
  OptionalParams,
  PaginationParams,
  PaginationResponseProps,
} from './shared.types';

export interface SimplifiedShow {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}

export interface Show extends SimplifiedShow {
  episodes: {
    items: SimplifiedEpisode[];
  } & PaginationResponseProps;
}

export interface Shows {
  shows: SimplifiedShow[];
}

export interface GetShowEpisodesOptionalParams extends PaginationParams {
  market?: string;
}

export interface ShowEpisodes extends PaginationResponseProps {
  items: SimplifiedEpisode[];
}

export type GetUsersSavedShowsOptionalParams = PaginationParams;

interface SavedShows {
  added_at: string;
  show: SimplifiedShow;
}

export interface UserSavedShows extends PaginationResponseProps {
  items: SavedShows[];
}

export interface GetShowParams {
  market?: string;
}

export type RemoveUsersShowsOptionalParams = OptionalParams;
