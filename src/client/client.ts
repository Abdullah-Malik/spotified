import { stringify } from 'querystring';
import SpotifyClientBase from './client.base';
import { OAuth2Helper } from '../client-mixins/oauth2.helper';
import { OAuth2RequestArgs, OAuth2RequestTokenResult } from '../types';

export default class spotified extends SpotifyClientBase {
  generateOAuth2AuthLink(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): OAuth2RequestTokenResult {
    if (!this._requestMaker.clientId) {
      throw new Error(
        `spotified instance is not initialized with client ID. 
        You can find your client ID in Spotify Developer Portal. 
        Please build an instance with: new spotified({ clientId: '<yourClientId>' })`
      );
    }

    const state = options.state ?? OAuth2Helper.generateRandomString(32);
    const codeVerifier = OAuth2Helper.getCodeVerifier();
    const codeChallenge = OAuth2Helper.getCodeChallengeFromVerifier(codeVerifier);
    const rawScope = options.scope ?? '';
    const scope = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;

    const url = `https://accounts.spotify.com/authorize?${stringify({
      response_type: 'code',
      client_id: this._requestMaker.clientId,
      scope,
      redirect_uri: redirectUri,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })}`;

    return {
      url,
      state,
      codeVerifier,
      codeChallenge,
    };
  }
}
