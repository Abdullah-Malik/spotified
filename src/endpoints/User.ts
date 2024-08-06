import { generateQueryParametersString } from 'utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { CurrentUserProfile, TopItemsOptionalParams, UserProfile, UsersTopItems } from '../types';

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
    return this.delete(`/playlists/${playlistId}/followers`)
  }

  // getFollowedArtists(type:string, optionalParams?: FollowedArtistOptionalParams) {

  // }
}

export default User;
