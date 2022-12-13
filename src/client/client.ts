import { stringify } from 'querystring';
import SpotifyClientBase from './client.base';
import { OAuth2Helper } from '../client-mixins/oauth2.helper';

export default class Spotified extends SpotifyClientBase {
  generateOAuth2AuthLink(redirectUri: string) {
    if (!this._requestMaker.clientId) {
      throw new Error(
        'Twitter API instance is not initialized with client ID. You can find your client ID in Twitter Developer Portal. ' +
          "Please build an instance with: new TwitterApi({ clientId: '<yourClientId>' })"
      );
    }

    const state = OAuth2Helper.generateRandomString(32);
    const rawScope = '';
    const scope = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;

    const result =
      'https://accounts.spotify.com/authorize?' +
      stringify({
        response_type: 'code',
        client_id: this._requestMaker.clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      });

    return result;
  }
}
