import { joinIdsArrayToString, generateQueryParametersString } from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { CurrentUserProfile, FollowedArtist, FollowedArtistOptionalParams, TopItemsOptionalParams, UserProfile, UsersTopItems } from '../types';

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
  getUsersTopItems(type: string, optionalParams?: TopItemsOptionalParams) {
    return this.get<UsersTopItems>(`/me/top/${type}?${generateQueryParametersString({ ...optionalParams })}`)
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
  followPlaylist(playlistId: string, options?: { public: boolean }) {
    return this.put(`/playlists/${playlistId}/followers`, options);
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
  getFollowedArtists(type:string, optionalParams?: FollowedArtistOptionalParams) {
    return this.get<FollowedArtist>(`/me/following`,{type, ...optionalParams})
  }

  /**
   * Remove the current user as a follower of one or more artists or other Spotify users.
   * https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
   */
  unfollowArtistsUsers(type: string, ids: string[]){
    return this.delete('/me/following',{type, ids: joinIdsArrayToString(ids)});
  }

  /**
   * Check to see if the current user is following one or more artists or other Spotify users.
   * https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
   */
  checkIfUserFollows(type: string, ids: string[]){
    return this.get<Array<boolean>>('/me/following/contains',{type, ids: joinIdsArrayToString(ids)});
  }

  /**
   * Check to see if the current user is following a specified playlist.
   * https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
   */
  checkIfCurrentUserFollowsPlaylist(playlistId: string){
    return this.get<Array<boolean>>(`/playlists/${playlistId}/followers/contains`);
  }
}

export default User;
