import joinIdsArrayToString, { generateQueryParametersString } from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
  GetShowParams,
  Show as ShowDetail,
  ShowEpisodes,
  SimplifiedShow,
  UserSavedShows,
  GetShowEpisodesOptionalParams,
  GetUsersSavedShowsOptionalParams,
  RemoveUsersShowsOptionalParams,
} from '../types';

export default class Show extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single show identified by its unique Spotify ID.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-show
   */
  getShow(id: string, optionalParams?: GetShowParams) {
    return this.get<ShowDetail>(`/shows/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for several shows based on their Spotify IDs.
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows
   */
  getSeveralShows(ids: string[], optionalParams?: GetShowParams) {
    return this.get<SimplifiedShow[]>(`/shows`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get Spotify catalog information about an show’s episodes.
   * Optional parameters can be used to limit the number of episodes returned.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
   */
  getShowsEpisodes(id: string, optionalParams: GetShowEpisodesOptionalParams) {
    return this.get<ShowEpisodes>(`/shows/${id}/episodes`, optionalParams);
  }

  /**
   * Get a list of shows saved in the current Spotify user's library.
   * Optional parameters can be used to limit the number of shows returned.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
   */
  getUsersSavedShows(optionalParams?: GetUsersSavedShowsOptionalParams) {
    return this.get<UserSavedShows>(`/me/shows`, optionalParams);
  }

  /**
   * Save one or more shows to current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/save-shows-user
   */
  saveShowsForUser(ids: string[]) {
    return this.put(`/me/shows${generateQueryParametersString({ ids: joinIdsArrayToString(ids) })}`);
  }

  /**
   * Delete one or more shows from current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
   */
  removeUsersShows(ids: string[], optionalParams: RemoveUsersShowsOptionalParams) {
    return this.delete(
      `/me/shows${generateQueryParametersString({ ids: joinIdsArrayToString(ids), ...optionalParams })}`
    );
  }

  /**
   * Check if one or more shows is already saved in the current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows
   */
  checkUsersSavedShows(ids: string[]) {
    return this.get<Array<boolean>>(`/me/shows/contains`, { ids: joinIdsArrayToString(ids) });
  }
}
