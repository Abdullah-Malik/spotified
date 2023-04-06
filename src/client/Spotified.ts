import { stringify } from 'querystring';
import { ReadWriteBaseClient } from './ReadWriteBaseClient';
import { OAuth2Helper } from '../client-helpers/OAuth2Helper';
import {
  ClientToken,
  isOAuth2Init,
  OAuth2AccessTokenArgs,
  OAuth2AccessTokenResult,
  OAuth2PCKERequestTokenResult,
  OAuth2PKCEAccessTokenArgs,
  OAuth2RequestArgs,
  OAuth2RequestTokenResult,
} from '../types';
import { User, Artist } from '../endpoints';
import RequestMaker from '../client-helpers/RequestMaker';

export class Spotified extends ReadWriteBaseClient {
  protected clientId?: string;

  protected clientSecret?: string;

  private authHeaders?: Record<string, string>;

  protected _user?: User;

  protected _artist?: Artist;

  constructor(token: ClientToken) {
    super(new RequestMaker());
    if (isOAuth2Init(token)) {
      this.clientId = token.clientId;
      this.clientSecret = token.clientSecret;
      this.authHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
      };
    }
  }

  public get user() {
    if (this._user) {
      return this._user;
    }
    this._user = new User(this._requestMaker);
    return this._user;
  }

  public get artist() {
    if (this._artist) {
      return this._artist;
    }
    this._artist = new Artist(this._requestMaker);
    return this._artist;
  }

  generateAuthLink(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): OAuth2RequestTokenResult {
    const state = options.state ?? OAuth2Helper.generateRandomString(32);
    const rawScope = options.scope ?? '';
    const scope = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;
    const url = `https://accounts.spotify.com/authorize?${stringify({
      response_type: 'code',
      client_id: this.clientId,
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
        client_id: this.clientId,
        client_secret: this.clientSecret,
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
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
      {
        headers: this.authHeaders,
      }
    );

    return accessTokenResult;
  }

  async refreshOAuth2Token(refreshToken: string) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResult>(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      {
        headers: this.authHeaders,
      }
    );

    return accessTokenResult;
  }

  async refreshPKCEOAuth2Token(refreshToken: string) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResult>(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.clientId,
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

export default Spotified;
