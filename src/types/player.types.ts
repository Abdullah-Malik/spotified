import { ExternalUrls, CursorProps } from './shared.types.js';
import { Track } from './track.types.js';
import { Episode } from './episode.types.js';

interface Device {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
  supports_volume: boolean;
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
  item?: Track | Episode | null;
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
  currently_playing: Track | Episode | null;
  queue: Track[] | Episode[];
}

export type AddItemToPlaybackQueueOptionalParams = PlayerOptionalParams;

interface PositionOffset {
  position: number;
}

interface URIOffset {
  uri: string;
}

export interface ResumePlaybackParams {
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

interface PlayHistoryObject {
  track?: Track;
  played_at?: string;
  context?: Context;
}

export interface RecentlyPlayedTracks {
  href?: string;
  limit?: number;
  next?: string;
  cursors?: CursorProps;
  total?: number;
  items?: PlayHistoryObject[];
}
