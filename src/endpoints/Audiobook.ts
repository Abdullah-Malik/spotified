import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  Audiobook as AudiobookDetail,
  AudiobookChapters,
  UserSavedAudiobooks,
  GetUsersSavedAudiobooksOptionalParams as GetUserSavedAudiobooksOptionalParams,
  GetAudiobookOptionalParams,
  GetAudiobookChaptersOptionalParams,
} from '../types/index.js';
import joinIdsArrayToString, { generateQueryParametersString } from '../utils.js';

export class Audiobook extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single audiobook.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
   */
  getAudiobook(id: string, optionalParams?: GetAudiobookOptionalParams) {
    return this.get<AudiobookDetail>(`/audiobooks/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks
   */
  getSeveralAudiobooks(ids: string[], optionalParams?: GetAudiobookOptionalParams) {
    return this.get<AudiobookDetail[]>(`/audiobooks`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get Spotify catalog information about an audiobook's chapters.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters
   */
  getAudiobookChapters(id: string, optionalParams?: GetAudiobookChaptersOptionalParams) {
    return this.get<AudiobookChapters>(`/audiobooks/${id}/chapters`, optionalParams);
  }

  /**
   * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks
   */
  getUserSavedAudiobook(optionalParams?: GetUserSavedAudiobooksOptionalParams) {
    return this.get<UserSavedAudiobooks>(`/me/audiobooks`, optionalParams);
  }

  /**
   * Save one or more audiobooks to the current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/save-audiobooks-user
   */
  saveAudiobooksforCurrentUser(ids: string[]) {
    return this.put(`/me/audiobooks${generateQueryParametersString({ ids: joinIdsArrayToString(ids) })}`);
  }

  /**
   * Remove one or more audiobooks from the Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/remove-audiobooks-user
   */
  removeUserSavedAudiobooks(ids: string[]) {
    return this.delete(`/me/audiobooks${generateQueryParametersString({ ids: joinIdsArrayToString(ids) })}`);
  }

  /**
   * Check if one or more audiobooks are already saved in the current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-audiobooks
   */
  checkUserSavedAudiobooks(ids: string[]) {
    return this.get<Array<boolean>>(
      `/me/audiobooks/contains${generateQueryParametersString({ ids: joinIdsArrayToString(ids) })}`
    );
  }
}

export default Audiobook;
