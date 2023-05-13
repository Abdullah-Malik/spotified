import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
  AddItemToPlaybackQueueOptionalParams,
  CurrentlyPlayingTrack,
  CurrentlyPlayingTrackParams,
  Devices,
  GetPlaybackStateParams,
  PlaybackState,
  RepeatState,
  ResumePlaybackParams,
  SeekToPositionOptionalParam,
  SetPlaybackVolumeOptionalParams,
  SetRepeatModeOptionalParams,
  TogglePlaybackShuffleOptionalParams,
  TransferPlaybackOptionalParams,
  UserTrackEpisodeQueue,
} from '../types';
import { generateQueryParametersString } from '../utils';

export class Player extends ReadWriteBaseClient {
  getPlaybackState(params?: GetPlaybackStateParams) {
    return this.get<PlaybackState>('/me/player', params);
  }

  transferPlayback(deviceIds: string[], optionalParams: TransferPlaybackOptionalParams) {
    return this.put('/me/player', { device_ids: deviceIds, ...optionalParams });
  }

  getAvailableDevices() {
    return this.get<Devices>('/me/player/devices');
  }

  getCurrentlyPlayingTrack(params?: CurrentlyPlayingTrackParams) {
    return this.get<CurrentlyPlayingTrack>('/me/player/currently-playing', params);
  }

  startResumePlayback(params?: ResumePlaybackParams) {
    this.put(`/me/player/play${generateQueryParametersString({ device_id: params?.device_id })}`, params);
  }

  pausePlayback(deviceId?: string) {
    return this.put(`/me/player/pause${generateQueryParametersString({ device_id: deviceId })}`);
  }

  skipToNext(deviceId?: string) {
    return this.post(`/me/player/next${generateQueryParametersString({ device_id: deviceId })}`);
  }

  skipToPrevious(deviceId?: string) {
    return this.post(`/me/player/previous${generateQueryParametersString({ device_id: deviceId })}`);
  }

  seekToPosition(positionMS: number, optionalParams?: SeekToPositionOptionalParam) {
    return this.put(`/me/player/seek${generateQueryParametersString({ position_ms: positionMS, ...optionalParams })}`);
  }

  setRepeatMode(state: RepeatState, optionalParams?: SetRepeatModeOptionalParams) {
    return this.put(`/me/player/repeat${generateQueryParametersString({ state, ...optionalParams })}`);
  }

  setPlaybackVolume(volume: number, optionalParams?: SetPlaybackVolumeOptionalParams) {
    return this.put(`/me/player/repeat${generateQueryParametersString({ volume_percent: volume, ...optionalParams })}`);
  }

  togglePlaybackShuffle(state: boolean, optionalParams: TogglePlaybackShuffleOptionalParams) {
    return this.put(`/me/player/shuffle${generateQueryParametersString({ state, ...optionalParams })}`);
  }

  getTheUserQueue() {
    return this.get<UserTrackEpisodeQueue>('/me/player/queue');
  }

  addItemToPlaybackQueue(uri: string, optionalParams: AddItemToPlaybackQueueOptionalParams) {
    this.post(`/me/player/queue${generateQueryParametersString({ uri: encodeURI(uri), ...optionalParams })}}`);
  }
}

export default Player;
