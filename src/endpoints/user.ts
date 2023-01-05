import SpotifiedSubClient from '../client/client.subclient';
import { UserProfile } from '../types';

export default class User extends SpotifiedSubClient {
  getCurrentUserProfile() {
    return this.get<UserProfile>('/me');
  }
}
