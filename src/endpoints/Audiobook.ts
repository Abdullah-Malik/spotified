import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
  GetTrackParams as GetMarketParams,
  OptionalUserSavedTrackParams as OptionalAudiobookParams,
  Audiobook as AudiobookDetails,
  Audiobooks as AudiobooksDetails,
  AudiobookChapters,
  UserSavedAudiobooks,
  GetUsersSavedAudiobooksOptionalParams,
} from '../types';
import joinIdsArrayToString from '../utils';

export class Audiobook extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single audiobook.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
   */
  getAudiobook(id: string, optionalParams?: GetMarketParams) {
    return this.get<AudiobookDetails>(`/audiobooks/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks
   */
  getAudiobooks(ids: string[], optionalParams?: GetMarketParams) {
    return this.get<AudiobooksDetails>(`/audiobooks`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get Spotify catalog information about an audiobook's chapters.
   * Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters
   */
  getAudiobookChapters(id: string, optionalParams?: OptionalAudiobookParams) {
    return this.get<AudiobookChapters>(`/audiobooks/${id}/chapters`, optionalParams);
  }

  /**
   * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks
   */
  getUsersSavedAudiobook(optionalParams?: GetUsersSavedAudiobooksOptionalParams) {
    return this.get<UserSavedAudiobooks>(`/me/audiobooks`, optionalParams);
  }

  /**
   * Save one or more audiobooks to the current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/save-audiobooks-user
   */
  saveAudiobooksforCurrentUser(ids: string[]) {
    return this.put(`/me/audiobooks`, { ids: joinIdsArrayToString(ids) });
  }

  /**
   * Remove one or more audiobooks from the Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/remove-audiobooks-user
   */
  removeUsersSavedAudiobooks(ids: string[]) {
    return this.delete(`/me/audiobooks`, { ids: joinIdsArrayToString(ids) });
  }

  /**
   * Check if one or more audiobooks are already saved in the current Spotify user's library.
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-audiobooks
   */
  checkUsersSavedAudiobooks(ids: string[]) {
    return this.get<Array<boolean>>(`/me/audiobooks/contains`, { ids: joinIdsArrayToString(ids) });
  }
}

export default Audiobook;
