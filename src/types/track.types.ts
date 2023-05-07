import { SimplifiedAlbum } from './album.types';
import { Artist } from './artist.types';
import { Restrictions, ExternalUrls, ExternalIds } from './shared.types';

interface OptionalParams {
  market?: string;
}

export type GetTrackParams = OptionalParams;

export interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Partial<LinkedFrom>;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
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

export interface TrackDetail {
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
  track?: Track;
  bars?: TimeConfidenceInfo[];
  beats?: TimeConfidenceInfo[];
  sections?: Section[];
  segments?: Segment[];
  tatums?: TimeConfidenceInfo[];
}
