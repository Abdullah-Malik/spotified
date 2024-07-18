import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { CurrentUserProfile, UserProfile } from '../types';

export class User extends ReadWriteBaseClient {
  getCurrentUserProfile() {
    return this.get<CurrentUserProfile>('/me');
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
}

export default User;
