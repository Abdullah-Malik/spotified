import {
  ExternalUrls,
  Image,
  OptionalParams,
  PaginationResponseProps,
  Restrictions,
  ResumePoint,
} from './shared.types';
import { SimplifiedShow } from './show.types';

export interface SimplifiedEpisode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: ResumePoint;
  type: 'episode';
  uri: string;
  restrictions?: Restrictions;
}

export interface Episode extends SimplifiedEpisode {
  show: SimplifiedShow;
}

export interface Episodes {
  episodes: Episode[];
}

interface SavedEpisode {
  added_at: string;
  episode: Episode;
}

export interface UserSavedEpisodes extends PaginationResponseProps {
  items: SavedEpisode[];
}

export type GetEpisodeParams = OptionalParams;

export interface GetSavedEpisodeParams extends PaginationResponseProps {
  market?: string;
}
