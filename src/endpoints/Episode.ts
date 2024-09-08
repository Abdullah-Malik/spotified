import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  GetEpisodeParams,
  GetSavedEpisodeParams,
  Episode as EpisodeDetail,
  Episodes,
  UserSavedEpisodes,
} from '../types/index.js';
import joinIdsArrayToString from '../utils.js';

export class Episode extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-episode
   */
  getEpisode(id: string, optionalParams?: GetEpisodeParams) {
    return this.get<EpisodeDetail>(`/episodes/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for several episodes based on their Spotify IDs.
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes
   */
  getSeveralEpisodes(ids: string[], optionalParams?: GetEpisodeParams) {
    return this.get<Episodes>(`/episodes`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get a list of the episodes saved in the current Spotify user's library
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes
   */
  getUserSavedEpisodes(optionalParams?: GetSavedEpisodeParams) {
    return this.get<UserSavedEpisodes>(`/me/episodes`, optionalParams);
  }

  /**
   * Save one or more episodes to the current user's library
   * https://developer.spotify.com/documentation/web-api/reference/save-episodes-user
   */
  saveEpisodesForCurrentUser(ids: string[]) {
    return this.put(`/me/episodes`, { ids });
  }

  /**
   * Remove one or more episodes from the current user's library
   * https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user
   */
  removeUserSavedEpisodes(ids: string[]) {
    return this.delete(`/me/episodes`, { ids });
  }

  /**
   * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes
   */
  checkUserSavedEpisodes(ids: string[]) {
    return this.get<Array<boolean>>(`/me/episodes/contains`, { ids: joinIdsArrayToString(ids) });
  }
}

export default Episode;
