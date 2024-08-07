import { joinIdsArrayToString, generateQueryParametersString } from '../utils';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
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
} from '../types';

export class User extends ReadWriteBaseClient {
  getCurrentUserProfile() {
    return this.get<CurrentUserProfile>('/me');
  }

  getUsersTopItems(type: UsersTopItemsType, optionalParams?: TopItemsOptionalParams) {
    return this.get<UsersTopItems>(`/me/top/${type}`, optionalParams);
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

  getFollowedArtists(type: FollowedArtistType, optionalParams?: FollowedArtistOptionalParams) {
    return this.get<FollowedArtist>(`/me/following`, { type, ...optionalParams });
  }

  followArtistsUsers(type: ArtistsUsersType, ids: string[]) {
    return this.put(`/me/following${generateQueryParametersString({ type })}`, { ids });
  }

  unfollowArtistsUsers(type: ArtistsUsersType, ids: string[]) {
    return this.delete(`/me/following${generateQueryParametersString({ type })}`, { ids });
  }

  checkIfUserFollows(type: ArtistsUsersType, ids: string[]) {
    return this.get<Array<boolean>>('/me/following/contains', { type, ids: joinIdsArrayToString(ids) });
  }

  checkIfCurrentUserFollowsPlaylist(playlistId: string, currentUserId: string) {
    return this.get<Array<boolean>>(`/playlists/${playlistId}/followers/contains`, { ids: currentUserId });
  }
}

export default User;
