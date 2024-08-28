import { joinIdsArrayToString, generateQueryParametersString } from '../utils.js';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';
import {
  CurrentUserProfile,
  FollowedArtist,
  FollowedArtistOptionalParams,
  FollowedArtistType,
  TopItemsOptionalParams,
  ArtistsUsersType,
  UserProfile,
  UsersTopItems,
  UsersTopItemsType,
} from '../types/index.js';

export class User extends ReadWriteBaseClient {
  /**
   * Get detailed profile information about the current user (including the current user's username).
   * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
   */
  getCurrentUserProfile() {
    return this.get<CurrentUserProfile>('/me');
  }

  /**
   * Get the current user's top artists or tracks based on calculated affinity.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
   */
  getUserTopItems(type: UsersTopItemsType, optionalParams?: TopItemsOptionalParams) {
    return this.get<UsersTopItems>(`/me/top/${type}`, optionalParams);
  }

  /**
   * Get public profile information about a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/get-users-profile
   */
  getUserProfile(userId: string) {
    return this.get<UserProfile>(`/users/${userId}`);
  }

  /**
   * Add the current user as a follower of a playlist.
   * https://developer.spotify.com/documentation/web-api/reference/follow-playlist
   */
  followPlaylist(playlistId: string, optionalParams?: { public: boolean }) {
    return this.put(`/playlists/${playlistId}/followers`, optionalParams);
  }

  /**
   * Remove the current user as a follower of a playlist.
   * https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
   */
  unfollowPlaylist(playlistId: string) {
    return this.delete(`/playlists/${playlistId}/followers`);
  }

  /**
   * Get the current user's followed artists.
   * https://developer.spotify.com/documentation/web-api/reference/get-followed
   */
  getFollowedArtists(type: FollowedArtistType, optionalParams?: FollowedArtistOptionalParams) {
    return this.get<FollowedArtist>(`/me/following`, { type, ...optionalParams });
  }

  /**
   * Add the current user as a follower of one or more artists or other Spotify users.
   * https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
   */
  followArtistsOrUsers(type: ArtistsUsersType, ids: string[]) {
    return this.put(`/me/following${generateQueryParametersString({ type })}`, { ids });
  }

  /**
   * Remove the current user as a follower of one or more artists or other Spotify users.
   * https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
   */
  unfollowArtistsUsers(type: ArtistsUsersType, ids: string[]) {
    return this.delete(`/me/following${generateQueryParametersString({ type })}`, { ids });
  }

  /**
   * Check to see if the current user is following one or more artists or other Spotify users.
   * https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
   */
  checkIfUserFollowsArtistsOrUsers(type: ArtistsUsersType, ids: string[]) {
    return this.get<Array<boolean>>('/me/following/contains', { type, ids: joinIdsArrayToString(ids) });
  }

  /**
   * Check to see if the current user is following a specified playlist.
   * https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
   */
  checkIfCurrentUserFollowsPlaylist(playlistId: string, currentUserId: string) {
    return this.get<Array<boolean>>(`/playlists/${playlistId}/followers/contains`, { ids: currentUserId });
  }
}

export default User;
