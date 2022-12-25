import SpotifiedSubClient from '../client/client.subclient';

export default class Users extends SpotifiedSubClient {
  getCurrentUserProfile() {
    return this.get<any>('/me');
  }
}
