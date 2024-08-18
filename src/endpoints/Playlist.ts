import {
  BodyRemovePlaylistItemsParams,
  FeaturedPlaylist,
  GetUsersSavedPlaylistOptionalParams,
  Image,
  OptionalFeaturedPlaylistParams,
  OptionalPlaylistDetailsParams,
  OptionalPlaylistItemsParams,
  OptionalPlaylistParams,
  OptionalUpdatePlaylistItemsParams,
  Playlist as PlaylistDetails,
  PlaylistItems,
  PlaylistItemsResponse,
  UserPlaylist,
} from '../types';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { joinIdsArrayToString } from '../utils';

export class Playlist extends ReadWriteBaseClient {
  /**
   * Get a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlist
   */
  getPlaylist(playlistId: string, optionalParams?: OptionalPlaylistParams) {
    return this.get<PlaylistDetails>(`/playlists/${playlistId}`, optionalParams);
  }

  /**
   * Change a playlist's name and public/private state. (The user must, of course, own the playlist
   * https://developer.spotify.com/documentation/web-api/reference/change-playlist-details
   */
  changePlaylistDetails(playlistId: string, bodyParams?: OptionalPlaylistDetailsParams) {
    return this.put(`/playlists/${playlistId}`, bodyParams);
  }

  /**
   * Get full details of the items of a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
   */
  getPlaylistItems(playlistId: string, optionalParams?: OptionalPlaylistItemsParams) {
    return this.get<PlaylistItems>(`/playlists/${playlistId}/tracks`, optionalParams);
  }

  /**
   * Either reorder or replace items in a playlist depending on the request's parameters
   * https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
   */
  updatePlaylistItems(playlistId: string, uris?: string[], bodyParams?: OptionalUpdatePlaylistItemsParams) {
    return this.put<PlaylistItemsResponse>(`/playlists/${playlistId}/tracks${joinIdsArrayToString(uris)}`, bodyParams);
  }

  /**
   * Add one or more items to a user's playlist.
   * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
   */
  //   addItemsToPlaylist() {}

  /**
   * Remove one or more items from a user's playlist.
   * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
   */
  removePlaylistItems(playlistId: string, bodyParams: BodyRemovePlaylistItemsParams) {
    return this.delete<PlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, bodyParams);
  }

  /**
   * Get a list of the playlists owned or followed by the current Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
   */
  getCurrentUsersPlaylist(optionalParams?: GetUsersSavedPlaylistOptionalParams) {
    return this.get<UserPlaylist>(`/me/playlist`, optionalParams);
  }

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
   */
  getUsersPlaylist(userId: string, optionalParams?: GetUsersSavedPlaylistOptionalParams) {
    return this.get<UserPlaylist>(`/users/${userId}/playlists`, optionalParams);
  }

  /**
   * Create a playlist for a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/create-playlist
   */
  createPlaylist(userId: string, bodyParams: OptionalPlaylistDetailsParams) {
    return this.post<Playlist>(`/users/${userId}/playlists`, bodyParams);
  }

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
   * https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
   */
  getFeaturedPlaylist(optionalParams?: OptionalFeaturedPlaylistParams) {
    return this.get<FeaturedPlaylist>(`/browse/featured-playlists`, optionalParams);
  }

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
   */
  getCategoryPlaylist(categoryId: string, optionalParams?: GetUsersSavedPlaylistOptionalParams) {
    return this.get<FeaturedPlaylist>(`/browse/categories/${categoryId}/playlists`, optionalParams);
  }

  /**
   * Get the current image associated with a specific playlist.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover
   */
  getPlaylistCoverImage(playlistId: string) {
    return this.get<Image>(`/playlists/${playlistId}/images`);
  }

  /**
   * Replace the image used to represent a specific playlist.
   * https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
   */
  //   addCustomPlaylistCoverImage() {}
}

export default Playlist;
