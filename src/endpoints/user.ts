import SpotifiedSubClient from '../client/client.subclient';
import { CurrentUserProfile, UserProfile } from '../types/user.types';

export default class User extends SpotifiedSubClient {
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
