import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  AudioAnalysis,
  AudioFeatures,
  AudioFeaturesArray,
  GetTrackParams,
  OptionalUserSavedTrackParams,
  RecommendationOptionalParams,
  RecommendationSeedParams,
  Recommendations,
  Track as TrackDetail,
  Tracks,
  UserSavedTracks,
} from '../types/index.js';
import { joinIdsArrayToString } from '../utils.js';

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
  getSeveralTracks(ids: string[], optionalParams?: GetTrackParams) {
    return this.get<Tracks>(`/tracks`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get a list of the songs saved in the current Spotify user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
   */
  getUsersSavedTracks(optionalParams?: OptionalUserSavedTrackParams) {
    return this.get<UserSavedTracks>(`/me/tracks`, optionalParams);
  }

  /**
   * Save one or more tracks to the current user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
   */
  saveTracksforCurrentUser(ids: string[]) {
    return this.put(`/me/tracks`, { ids });
  }

  /**
   * Remove one or more tracks from the current user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
   */
  removeUsersSavedTracks(ids: string[]) {
    return this.delete(`/me/tracks`, { ids });
  }

  /**
   * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
   */
  checkUsersSavedTracks(ids: string[]) {
    return this.get<Array<boolean>>(`/me/tracks/contains`, { ids: joinIdsArrayToString(ids) });
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
    return this.get<AudioFeaturesArray>(`/audio-features`, { ids: joinIdsArrayToString(ids) });
  }

  /**
   * Get a low-level audio analysis for a track in the Spotify catalog.
   * The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre
   * https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
   */
  getTracksAudioAnalysis(id: string) {
    return this.get<AudioAnalysis>(`audio-analysis/${id}`);
  }

  /**
   * Recommendations are generated based on the available information for a given seed entity
   * and matched against similar artists and tracks
   * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
   */
  getRecommendations(seedParams: RecommendationSeedParams, optionalParams: RecommendationOptionalParams) {
    return this.get<Recommendations>(`/recommendations`, { ...seedParams, ...optionalParams });
  }
}

export default Track;
