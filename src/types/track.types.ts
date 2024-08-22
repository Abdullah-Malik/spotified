import { SimplifiedAlbum } from './album.types';
import { SimplifiedArtist } from './artist.types';
import {
  Restrictions,
  ExternalUrls,
  ExternalIds,
  PaginationParams,
  OptionalParams,
  PaginationResponseProps,
} from './shared.types';

export type GetTrackParams = OptionalParams;

export interface OptionalUserSavedTrackParams extends PaginationParams {
  market?: string;
}

export interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SimplifiedTrack {
  artists?: SimplifiedArtist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Partial<LinkedFrom>;
  restrictions?: Restrictions;
  name?: string;
  preview_url?: string | null;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
}

export interface Track extends SimplifiedTrack {
  album?: SimplifiedAlbum;
  external_ids?: ExternalIds;
  popularity?: number;
}

export interface Tracks {
  tracks: Track[];
}

export interface TrackParams {
  id: string;
  market?: string;
}

export interface TracksParams {
  ids: string[];
  market?: string;
}

interface SavedTrack {
  added_at: string;
  track: Track;
}

export interface UserSavedTracks extends PaginationResponseProps {
  items: SavedTrack[];
}

export interface AudioFeatures {
  acousticness?: number;
  analysis_url?: string;
  danceability?: number;
  duration_ms?: number;
  energy?: number;
  id?: string;
  instrumentalness?: number;
  key?: number;
  liveness?: number;
  loudness?: number;
  mode?: number;
  speechiness?: number;
  tempo?: number;
  time_signature?: number;
  track_href?: string;
  type?: string;
  uri?: string;
  valence?: number;
}

export interface AudioFeaturesArray {
  audio_features: AudioFeatures[];
}

export interface TimeConfidenceInfo {
  start?: number;
  duration?: number;
  confidence?: number;
}

export interface Meta {
  analyzer_version?: string;
  platform?: string;
  detailed_status?: string;
  status_code?: number;
  timestamp?: number;
  analysis_time?: number;
  input_process?: string;
}

export interface Section {
  start?: number;
  duration?: number;
  confidence?: number;
  loudness?: number;
  tempo?: number;
  tempo_confidence?: number;
  key?: number;
  key_confidence?: number;
  mode?: number;
  mode_confidence?: number;
  time_signature?: number;
  time_signature_confidence?: number;
}

export interface Segment {
  start?: number;
  duration?: number;
  confidence?: number;
  loudness_start?: number;
  loudness_max?: number;
  loudness_max_time?: number;
  loudness_end?: number;
  pitches?: number[];
  timbre?: number[];
}

export interface TrackAudioAnalysisDetail {
  num_samples?: number;
  duration?: number;
  sample_md5?: string;
  offset_seconds?: number;
  window_seconds?: number;
  analysis_sample_rate?: number;
  analysis_channels?: number;
  end_of_fade_in?: number;
  start_of_fade_out?: number;
  loudness?: number;
  tempo?: number;
  tempo_confidence?: number;
  time_signature?: number;
  time_signature_confidence?: number;
  key?: number;
  key_confidence?: number;
  mode?: number;
  mode_confidence?: number;
  codestring?: string;
  code_version?: number;
  echoprintstring?: string;
  echoprint_version?: number;
  synchstring?: string;
  synch_version?: number;
  rhythmstring?: string;
  rhythm_version?: number;
}

export interface AudioAnalysis {
  meta?: Meta;
  track?: TrackAudioAnalysisDetail;
  bars?: TimeConfidenceInfo[];
  beats?: TimeConfidenceInfo[];
  sections?: Section[];
  segments?: Segment[];
  tatums?: TimeConfidenceInfo[];
}

export interface RecommendationOptionalParams {
  limit?: number;
  market?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}

export interface RecommendationSeedParams {
  seed_artists: string;
  seed_genres: string;
  seed_tracks: string;
}
interface RecommendationSeeds {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}
export interface Recommendations {
  seeds: RecommendationSeeds[];
  tracks: Track[];
}
