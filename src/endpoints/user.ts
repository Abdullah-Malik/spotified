import SpotifiedSubClient from '../client/client.subclient';
import { UserProfile } from '../types/user.types';

export default class User extends SpotifiedSubClient {
  getCurrentUserProfile() {
    return this.get<UserProfile>('/me');
  }
}
