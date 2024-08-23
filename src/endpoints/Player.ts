import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  AddItemToPlaybackQueueOptionalParams,
  CurrentlyPlayingTrack,
  CurrentlyPlayingTrackParams,
  Devices,
  GetPlaybackStateParams,
  GetRecentlyPlayedTracksOptionalParams,
  PlaybackState,
  RepeatState,
  ResumePlaybackParams,
  RecentlyPlayedTracks,
  SeekToPositionOptionalParam,
  SetPlaybackVolumeOptionalParams,
  SetRepeatModeOptionalParams,
  TogglePlaybackShuffleOptionalParams,
  TransferPlaybackOptionalParams,
  UserTrackEpisodeQueue,
} from '../types/index.js';
import { generateQueryParametersString } from '../utils.js';

export class Player extends ReadWriteBaseClient {
  /**
   * Get information about the user’s current playback state, including track or episode, progress, and active device
   * https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
   */
  getPlaybackState(optionalParams?: GetPlaybackStateParams) {
    return this.get<PlaybackState>('/me/player', optionalParams);
  }

  /**
   * Transfer playback to a new device and determine if it should start playing
   * https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
   */
  transferPlayback(deviceIds: string[], optionalParams: TransferPlaybackOptionalParams) {
    return this.put('/me/player', { device_ids: deviceIds, ...optionalParams });
  }

  /**
   * Get information about a user’s available devices
   * https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
   */
  getAvailableDevices() {
    return this.get<Devices>('/me/player/devices');
  }

  /**
   * Get the object currently being played on the user's Spotify account
   * https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
   */
  getCurrentlyPlayingTrack(optionalParams?: CurrentlyPlayingTrackParams) {
    return this.get<CurrentlyPlayingTrack>('/me/player/currently-playing', optionalParams);
  }

  /**
   * Start a new context or resume current playback on the user's active device
   * https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
   */
  startResumePlayback(deviceId: string, params: ResumePlaybackParams) {
    this.put(`/me/player/play${generateQueryParametersString({ device_id: deviceId })}`, params);
  }

  /**
   * Pause playback on the user's account
   * https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
   */
  pausePlayback(deviceId?: string) {
    return this.put(`/me/player/pause${generateQueryParametersString({ device_id: deviceId })}`);
  }

  /**
   * Skips to next track in the user’s queue
   * https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
   */
  skipToNext(deviceId?: string) {
    return this.post(`/me/player/next${generateQueryParametersString({ device_id: deviceId })}`);
  }

  /**
   * Skips to previous track in the user’s queue
   * https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
   */
  skipToPrevious(deviceId?: string) {
    return this.post(`/me/player/previous${generateQueryParametersString({ device_id: deviceId })}`);
  }

  /**
   * Seeks to the given position in the user’s currently playing track
   * https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
   */
  seekToPosition(positionMS: number, optionalParams?: SeekToPositionOptionalParam) {
    return this.put(`/me/player/seek${generateQueryParametersString({ position_ms: positionMS, ...optionalParams })}`);
  }

  /**
   * Set the repeat mode for the user's playback. Options are repeat-track, repeat-context, and off
   * https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
   */
  setRepeatMode(state: RepeatState, optionalParams?: SetRepeatModeOptionalParams) {
    return this.put(`/me/player/repeat${generateQueryParametersString({ state, ...optionalParams })}`);
  }

  /**
   * Set the volume for the user’s current playback device
   * https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
   */
  setPlaybackVolume(volume: number, optionalParams?: SetPlaybackVolumeOptionalParams) {
    return this.put(`/me/player/volume${generateQueryParametersString({ volume_percent: volume, ...optionalParams })}`);
  }

  /**
   * Toggle shuffle on or off for user’s playback
   * https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
   */
  togglePlaybackShuffle(state: boolean, optionalParams: TogglePlaybackShuffleOptionalParams) {
    return this.put(`/me/player/shuffle${generateQueryParametersString({ state, ...optionalParams })}`);
  }

  /**
   * Get tracks from the current user's recently played tracks
   * https://developer.spotify.com/documentation/web-api/reference/get-recently-played
   */
  getRecentlyPlayedTracks(optionalParams: GetRecentlyPlayedTracksOptionalParams) {
    return this.get<RecentlyPlayedTracks>(`/me/player/recently-played`, optionalParams);
  }

  /**
   * Get the list of objects that make up the user's queue
   * https://developer.spotify.com/documentation/web-api/reference/get-queue
   */
  getTheUserQueue() {
    return this.get<UserTrackEpisodeQueue>('/me/player/queue');
  }

  /**
   * Add an item to the end of the user's current playback queue
   * https://developer.spotify.com/documentation/web-api/reference/add-to-queue
   */
  addItemToPlaybackQueue(uri: string, optionalParams: AddItemToPlaybackQueueOptionalParams) {
    this.post(`/me/player/queue${generateQueryParametersString({ uri: encodeURIComponent(uri), ...optionalParams })}}`);
  }
}

export default Player;
