import {
  FeaturedPlaylist,
  GetUserSavedPlaylistsOptionalParams,
  Image,
  OptionalGetFeaturedPlaylistParams,
  ChangePlaylistDetailsOptionalParams,
  GetPlaylistItemsOptionalParams,
  GetPlaylistOptionalParams,
  UpdatePlaylistItemsOptionalParams,
  Playlist as PlaylistDetail,
  PlaylistItems,
  PlaylistItemsResponse as UpdatePlaylistItemsResponse,
  UserPlaylist,
  AddItemsToPlaylistOptionalParams,
  AddItemsToPlaylistResponse,
  RemovePlaylistItemsResponse,
  RemovePlaylistItemsParams,
  CreatePlaylistOptionalParams,
  GetCategoryPlaylistOptionalParams,
  CategoryPlaylist,
} from '../types';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Playlist extends ReadWriteBaseClient {
  /**
   * Get a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlist
   */
  getPlaylist(playlistId: string, optionalParams?: GetPlaylistOptionalParams) {
    return this.get<PlaylistDetail>(`/playlists/${playlistId}`, optionalParams);
  }

  /**
   * Change a playlist's name and public/private state. (The user must, of course, own the playlist
   * https://developer.spotify.com/documentation/web-api/reference/change-playlist-details
   */
  changePlaylistDetails(playlistId: string, optionalParams?: ChangePlaylistDetailsOptionalParams) {
    return this.put(`/playlists/${playlistId}`, optionalParams);
  }

  /**
   * Get full details of the items of a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
   */
  getPlaylistItems(playlistId: string, optionalParams?: GetPlaylistItemsOptionalParams) {
    return this.get<PlaylistItems>(`/playlists/${playlistId}/tracks`, optionalParams);
  }

  /**
   * Either reorder or replace items in a playlist depending on the request's parameters
   * https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
   */
  updatePlaylistItems(playlistId: string, optionalParams?: UpdatePlaylistItemsOptionalParams) {
    return this.put<UpdatePlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, optionalParams);
  }

  /**
   * Add one or more items to a user's playlist.
   * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
   */
  addItemsToPlaylist(playlistId: string, optionalParams: AddItemsToPlaylistOptionalParams) {
    return this.post<AddItemsToPlaylistResponse>(`/playlists/${playlistId}/tracks`, optionalParams);
  }

  /**
   * Remove one or more items from a user's playlist.
   * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
   */
  removePlaylistItems(playlistId: string, bodyParams: RemovePlaylistItemsParams) {
    return this.delete<RemovePlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, bodyParams);
  }

  /**
   * Get a list of the playlists owned or followed by the current Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
   */
  getCurrentUserPlaylists(optionalParams?: GetUserSavedPlaylistsOptionalParams) {
    return this.get<UserPlaylist>(`/me/playlists`, optionalParams);
  }

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
   */
  getUserPlaylists(userId: string, optionalParams?: GetUserSavedPlaylistsOptionalParams) {
    return this.get<UserPlaylist>(`/users/${userId}/playlists`, optionalParams);
  }

  /**
   * Create a playlist for a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/create-playlist
   */
  createPlaylist(userId: string, playlistName: string, optionalParams: CreatePlaylistOptionalParams) {
    return this.post<PlaylistDetail>(`/users/${userId}/playlists`, { name: playlistName, ...optionalParams });
  }

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
   * https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
   */
  getFeaturedPlaylist(optionalParams?: OptionalGetFeaturedPlaylistParams) {
    return this.get<FeaturedPlaylist>(`/browse/featured-playlists`, optionalParams);
  }

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   * https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
   */
  getCategoryPlaylist(categoryId: string, optionalParams?: GetCategoryPlaylistOptionalParams) {
    return this.get<CategoryPlaylist>(`/browse/categories/${categoryId}/playlists`, optionalParams);
  }

  /**
   * Get the current image associated with a specific playlist.
   * https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover
   */
  getPlaylistCoverImage(playlistId: string) {
    return this.get<Image[]>(`/playlists/${playlistId}/images`);
  }

  /**
   * Replace the image used to represent a specific playlist.
   * https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
   */
  addCustomPlaylistCoverImage(playlistId: string, base64EncodedJpeg: string) {
    return this.put(`/playlists/${playlistId}/images`, base64EncodedJpeg, {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  }
}

export default Playlist;
