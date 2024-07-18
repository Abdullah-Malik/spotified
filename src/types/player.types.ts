import { ExternalUrls } from './shared.types';
import { Track } from './track.types';

interface Device {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
}

export interface Devices {
  devices: Device[];
}

interface Actions {
  interrupting_playback?: boolean;
  pausing?: boolean;
  resuming?: boolean;
  seeking?: boolean;
  skipping_next?: boolean;
  skipping_prev?: boolean;
  toggling_repeat_context?: boolean;
  toggling_shuffle?: boolean;
  toggling_repeat_track?: boolean;
  transferring_playback?: boolean;
}

interface Context {
  type?: string;
  href?: string;
  external_urls?: ExternalUrls;
  uri?: string;
}

export interface PlaybackState {
  device?: Device;
  repeat_state?: string;
  shuffle_state?: boolean;
  context?: Context | null;
  timestamp?: number;
  progress_ms?: number;
  is_playing?: boolean;
  item?: Track;
  currently_playing_type?: string;
  actions?: Actions;
}

export interface GetPlaybackStateParams {
  market?: string;
  additional_types?: string;
}

export type CurrentlyPlayingTrack = PlaybackState;

export type CurrentlyPlayingTrackParams = GetPlaybackStateParams;

interface PlayerOptionalParams {
  device_id?: string;
}

export type SeekToPositionOptionalParam = PlayerOptionalParams;

export interface TransferPlaybackOptionalParams {
  play?: boolean;
}

export type RepeatState = 'track' | 'context' | 'off';

export type SetRepeatModeOptionalParams = PlayerOptionalParams;

export type SetPlaybackVolumeOptionalParams = PlayerOptionalParams;

export type TogglePlaybackShuffleOptionalParams = PlayerOptionalParams;

export interface UserTrackEpisodeQueue {
  currently_playing: Track | null;
  queue: Track[];
}

export type AddItemToPlaybackQueueOptionalParams = PlayerOptionalParams;

interface PositionOffset {
  position: number;
}

interface URIOffset {
  uri: string;
}

export interface ResumePlaybackParams {
  device_id?: string;
  context_uri?: string;
  uris?: string[];
  position_ms?: number;
  offset?: PositionOffset | URIOffset;
}

export interface GetRecentlyPlayedTracksOptionalParams {
  limit?: number;
  after?: number;
  before?: number;
}

interface PlaybackCursorParams {
  after?: string;
  before?: string;
}

interface ContextParams {
  type?: string;
  href?: string;
  external_urls: ExternalUrls;
  uri?: string;
}

interface PlayHistoryObject {
  track?: Track;
  played_at?: string;
  context?: ContextParams;
}

export interface RecentlyPlayedTracks {
  href?: string;
  limit?: number;
  next?: string;
  cursors?: PlaybackCursorsParams;
  total?: number;
  items?: PlayHistoryObject[];
}