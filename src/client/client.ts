import { stringify } from 'querystring';
import SpotifiedClientBase from './client.base';
import { OAuth2Helper } from '../client-mixins/oauth2.helper';
import {
  OAuth2AccessTokenArgs,
  OAuth2AccessTokenResult,
  OAuth2PCKERequestTokenResult,
  OAuth2PKCEAccessTokenArgs,
  OAuth2RequestArgs,
  OAuth2RequestTokenResult,
} from '../types';
import { Users } from '../endpoints';

export default class Spotified extends SpotifiedClientBase {
  protected _users?: Users;

  public get users() {
    if (this._users) {
      return this._users;
    }
    this._users = new Users(this);
    return this._users;
  }

  private authHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${Buffer.from(`${this._requestMaker.clientId}:${this._requestMaker.clientSecret}`).toString(
      'base64'
    )}`,
  };

  generateAuthLink(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): OAuth2RequestTokenResult {
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
    const accessTokenResult = await this.post<OAuth2AccessTokenResult>(
      'https://accounts.spotify.com/api/token',
      {
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        client_id: this._requestMaker.clientId,
        client_secret: this._requestMaker.clientSecret,
      },
      {
        headers: this.authHeaders,
      }
    );

    return accessTokenResult;
  }

  async getPKCEAccessToken({ code, codeVerifier, redirectUri }: OAuth2PKCEAccessTokenArgs) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResult>(
      'https://accounts.spotify.com/api/token',
      {
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        client_id: this._requestMaker.clientId,
        client_secret: this._requestMaker.clientSecret,
      },
      {
        headers: this.authHeaders,
      }
    );

    return accessTokenResult;
  }

  setBearerToken(bearerToken: string) {
    this._requestMaker.setBearerToken(bearerToken);
  }
}
