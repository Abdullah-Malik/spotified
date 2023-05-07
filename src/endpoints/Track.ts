import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
  AudioAnalysis,
  AudioFeatures,
  AudioFeaturesArray,
  GetTrackParams,
  Track as TrackDetail,
  Tracks as TracksDetail,
} from '../types/track.types';

export class Track extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single track identified by its unique Spotify ID
   * https://developer.spotify.com/documentation/web-api/reference/get-track
   */
  getTrack(id: string, optionalParams?: GetTrackParams) {
    return this.get<TrackDetail>(`/tracks/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for multiple tracks based on their Spotify IDs
   * https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
   */
  getTracks(ids: string[], optionalParams?: GetTrackParams) {
    return this.get<TracksDetail>(`/tracks?ids=${encodeURI(ids.join(','))}`, optionalParams);
  }

  /**
   * Get a list of the songs saved in the current Spotify user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
   */
  saveTracksforCurrentUser(ids: string[]) {
    return this.put(`/me/tracks?ids=${encodeURI(ids.join(','))}`);
  }

  /**
   * Remove one or more tracks from the current user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
   */
  removeUsersSavedTracks(ids: string[]) {
    return this.delete(`/me/tracks?ids=${encodeURI(ids.join(','))}`);
  }

  /**
   * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
   */
  checkUsersSavedTracks(ids: string[]) {
    return this.get<Array<boolean>>(`/me/tracks/contains?ids=${encodeURI(ids.join(','))}`);
  }

  /**
   * Get audio feature information for a single track identified by its unique Spotify ID
   * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
   */
  getTracksAudioFeatures(id: string) {
    return this.get<AudioFeatures>(`/audio-features/${id}`);
  }

  /**
   * Get audio features for multiple tracks based on their Spotify IDs
   * https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
   */
  getMultipleTracksAudioFeatures(ids: string[]) {
    return this.get<AudioFeaturesArray>(`/audio-features?ids=${encodeURI(ids.join(','))}`);
  }

  /**
   * Get a low-level audio analysis for a track in the Spotify catalog.
   * The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre
   * https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
   */
  getTracksAudioAnalysis(id: string) {
    return this.get<AudioAnalysis>(`audio-analysis/${id}`);
  }
}

export default Track;
