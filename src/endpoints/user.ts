import { SpotifiedReadWriteBaseClient } from '../client/client.write.base';
import { CurrentUserProfile, UserProfile } from '../types';

export class User extends SpotifiedReadWriteBaseClient {
  getCurrentUserProfile() {
    return this.get<CurrentUserProfile>('/me');
  }

  getUserProfile(userId: string) {
    return this.get<UserProfile>(`/users/${userId}`);
  }

  followPlaylist(playlistId: string, options?: { public: boolean }) {
    return this.put(`/playlists/${playlistId}/followers`, options);
  }
}

export default User;
