import { stringify } from 'querystring';
import SpotifyClientBase from './client.base';
import { OAuth2Helper } from '../client-mixins/oauth2.helper';
import {
  OAuth2AccessTokenArgs,
  OAuth2PCKERequestTokenResult,
  OAuth2PKCEAccessTokenArgs,
  OAuth2RequestArgs,
  OAuth2RequestTokenResult,
} from '../types';

export default class Spotified extends SpotifyClientBase {
  private checkInitializationError() {
    if (!this._requestMaker.clientId) {
      throw new Error(
        `Spotified instance is not initialized with client ID. 
        You can find your client ID in Spotify Developer Portal. 
        Please build an instance with: new spotified({ clientId: '<yourClientId>' })`
      );
    }
  }

  generateAuthLink(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): OAuth2RequestTokenResult {
    this.checkInitializationError();

    const state = options.state ?? OAuth2Helper.generateRandomString(32);
    const rawScope = options.scope ?? '';
    const scope = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;

    const url = `https://accounts.spotify.com/authorize?${stringify({
      response_type: 'code',
      client_id: this._requestMaker.clientId,
      scope,
      redirect_uri: redirectUri,
      state,
    })}`;

    return {
      url,
      state,
    };
  }

  generatePKCEAuthLink(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): OAuth2PCKERequestTokenResult {
    this.checkInitializationError();

    const res = this.generateAuthLink(redirectUri, { ...options });

    const { state } = res;
    const codeVerifier = OAuth2Helper.getCodeVerifier();
    const codeChallenge = OAuth2Helper.getCodeChallengeFromVerifier(codeVerifier);

    const url = `${res.url}&${stringify({ code_challenge: codeChallenge, code_challenge_method: 'S256' })}`;

    return {
      url,
      state,
      codeVerifier,
      codeChallenge,
    };
  }

  async getAccessToken({ code, redirectUri }: OAuth2AccessTokenArgs) {
    this.checkInitializationError();

    const accessTokenResult = await this.post('https://accounts.spotify.com/api/token', {
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      client_id: this._requestMaker.clientId,
      client_secret: this._requestMaker.clientSecret,
    });

    return accessTokenResult;
  }

  async getPKCEAccessToken({ code, codeVerifier, redirectUri }: OAuth2PKCEAccessTokenArgs) {
    this.checkInitializationError();

    const accessTokenResult = await this.post('https://accounts.spotify.com/api/token', {
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      client_id: this._requestMaker.clientId,
      client_secret: this._requestMaker.clientSecret,
    });

    return accessTokenResult;
  }
}
