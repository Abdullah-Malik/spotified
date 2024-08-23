import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  Album as AlbumDetail,
  AlbumTracks,
  GetAlbumOptionalParams,
  GetUserSavedAlbumsOptionalParams,
  GetAlbumTracksOptionalParams,
  PagedAlbums,
  UserSavedAlbum,
  GetNewReleasesOptionalParams,
} from '../types/index.js';
import { joinIdsArrayToString } from '../utils.js';

export class Album extends ReadWriteBaseClient {
  /**
   * Get Spotify catalog information for a single album.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-album
   */
  getAlbum(id: string, optionalParams?: GetAlbumOptionalParams) {
    return this.get<AlbumDetail>(`/albums/${id}`, optionalParams);
  }

  /**
   * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
   */
  getSeveralAlbums(ids: string[], optionalParams?: GetAlbumOptionalParams) {
    return this.get<AlbumDetail[]>(`/albums`, { ids: joinIdsArrayToString(ids), ...optionalParams });
  }

  /**
   * Get Spotify catalog information about an album’s tracks.
   * Optional parameters can be used to limit the number of tracks returned.
   * https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
   */
  getAlbumTracks(id: string, optionalParams?: GetAlbumTracksOptionalParams) {
    return this.get<AlbumTracks>(`/albums/${id}/tracks`, optionalParams);
  }

  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
   */
  getUserSavedAlbum(optionalParams?: GetUserSavedAlbumsOptionalParams) {
    return this.get<UserSavedAlbum>(`/me/albums`, optionalParams);
  }

  /**
   * Save one or more albums to the current user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/save-albums-user
   */
  saveAlbumsforCurrentUser(ids: string[]) {
    return this.put(`/me/albums`, { ids });
  }

  /**
   * Remove one or more albums from the current user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
   */
  removeUsersSavedAlbum(ids: string[]) {
    return this.delete(`/me/albums`, { ids });
  }

  /**
   * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
   * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
   */
  checkUsersSavedAlbums(ids: string[]) {
    return this.get<Array<boolean>>(`/me/albums/contains`, { ids: joinIdsArrayToString(ids) });
  }

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * https://developer.spotify.com/documentation/web-api/reference/get-new-releases
   */
  getNewReleases(optionalParams?: GetNewReleasesOptionalParams) {
    return this.get<PagedAlbums>(`/broese/new-releases`, optionalParams);
  }
}

export default Album;
