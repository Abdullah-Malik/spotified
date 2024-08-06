import { joinIdsArrayToString, generateQueryParametersString } from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { CurrentUserProfile, FollowedArtist, FollowedArtistOptionalParams, TopItemsOptionalParams, UserProfile, UsersTopItems } from '../types';

export class User extends ReadWriteBaseClient {
  getCurrentUserProfile() {
    return this.get<CurrentUserProfile>('/me');
  }

  getUsersTopItems(type: string, optionalParams?: TopItemsOptionalParams) {
    return this.get<UsersTopItems>(`/me/top/${type}?${generateQueryParametersString({ ...optionalParams })}`)
  }

  getUserProfile(userId: string) {
    return this.get<UserProfile>(`/users/${userId}`);
  }

  followPlaylist(playlistId: string, options?: { public: boolean }) {
    return this.put(`/playlists/${playlistId}/followers`, options);
  }

  unfollowPlaylist(playlistId: string) {
    return this.delete(`/playlists/${playlistId}/followers`);
  }

  getFollowedArtists(type:string, optionalParams?: FollowedArtistOptionalParams) {
    return this.get<FollowedArtist>(`/me/following`,{type, ...optionalParams})
  }

  unfollowArtistsUsers(type: string, ids: string[]){
    return this.delete('/me/following',{type, ids: joinIdsArrayToString(ids)});
  }

  checkIfUserFollows(type: string, ids: string[]){
    return this.get<Array<boolean>>('/me/following/contains',{type, ids: joinIdsArrayToString(ids)});
  }

  checkIfCurrentUserFollowsPlaylist(playlistId: string){
    return this.get<Array<boolean>>(`/playlists/${playlistId}/followers/contains`);
  }
}

export default User;
