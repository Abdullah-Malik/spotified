import { stringify } from 'querystring';
import { ReadWriteBaseClient } from './ReadWriteBaseClient';
import { OAuth2Helper } from '../client-helpers/OAuth2Helper';
import {
  ClientToken,
  isOAuth2Init,
  OAuth2AccessTokenArgs,
  OAuth2AccessTokenResponse,
  PCKEAuthURLData,
  OAuth2PKCEAccessTokenArgs,
  OAuth2RequestArgs,
  AuthURLData,
  ImplicitGrantURLData,
  ClientCredentialsFlowResponse,
} from '../types';
import { User, Artist, Track, Player, Market, Genre } from '../endpoints';
import RequestMaker from '../client-helpers/RequestMaker';

const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const API_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export class Spotified extends ReadWriteBaseClient {
  protected clientId?: string;

  protected clientSecret?: string;

  protected _user?: User;

  protected _artist?: Artist;

  protected _track?: Track;

  protected _player?: Player;

  protected _market?: Market;

  protected _genre?: Genre;

  constructor(token: ClientToken) {
    super(new RequestMaker());
    if (isOAuth2Init(token)) {
      this.clientId = token.clientId;
      this.clientSecret = token.clientSecret;
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

  public get track() {
    if (this._track) {
      return this._track;
    }
    this._track = new Track(this._requestMaker);
    return this._track;
  }

  public get player() {
    if (this._player) {
      return this._player;
    }
    this._player = new Player(this._requestMaker);
    return this._player;
  }

  public get market() {
    if (this._market) {
      return this._market;
    }
    this._market = new Market(this._requestMaker);
    return this._market;
  }

  public get genre() {
    if (this._genre) {
      return this._genre;
    }
    this._genre = new Genre(this._requestMaker);
    return this._genre;
  }

  generateAuthorizationCodeFlowURL(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): AuthURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(64);
    const scope = options.scope ?? '';
    const showDialog = options.show_dialog ?? false;

    const params: Record<string, string | boolean> = {
      response_type: 'code',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
      showDialog,
    };

    if (scope) {
      params.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    }

    const url = `${AUTHORIZE_URL}?${stringify(params)}`;

    return {
      url,
      state,
    };
  }

  generatePKCEAuthorizationCodeFlowURL(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): PCKEAuthURLData {
    const res = this.generateAuthorizationCodeFlowURL(redirectUri, { ...options });
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

  generateImplicitGrantAuthURL(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): ImplicitGrantURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(64);
    const scope = options.scope ?? '';
    const showDialog = options.show_dialog ?? false;

    const params: Record<string, string> = {
      response_type: 'token',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
    };

    if (scope) {
      params.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    }

    if (showDialog) {
      params.show_dialog = showDialog.toString();
    }

    const url = `${AUTHORIZE_URL}?${stringify(params)}`;

    return {
      url,
      state,
    };
  }

  async requestAuthorizationCodeFlowAccessToken({ code, redirectUri }: OAuth2AccessTokenArgs) {
    if (this.clientSecret === undefined) {
      throw new Error('Client secret is required for requesting an access token');
    }

    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
      {
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
      }
    );

    return accessTokenResult;
  }

  async requestPKCEAuthorizationCodeFlowAccessToken({ code, codeVerifier, redirectUri }: OAuth2PKCEAccessTokenArgs) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
      {
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        client_id: this.clientId,
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return accessTokenResult;
  }

  async clientCredentialsFlow() {
    if (this.clientSecret === undefined) {
      throw new Error('Client secret is required for requesting authorization');
    }

    const accessTokenResult = await this.post<ClientCredentialsFlowResponse>(
      API_TOKEN_URL,
      {
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
      }
    );

    return accessTokenResult;
  }

  async refreshAuthorizationCodeFlowAccessToken(refreshToken: string) {
    if (this.clientSecret === undefined) {
      throw new Error('Client secret is required for requesting an access token');
    }

    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
      }
    );

    return accessTokenResult;
  }

  async refreshPKCEAuthorizationCodeFlowAccessToken(refreshToken: string) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.clientId,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return accessTokenResult;
  }

  setBearerToken(bearerToken: string) {
    this._requestMaker.setBearerToken(bearerToken);
  }
}

export default Spotified;
