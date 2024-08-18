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
  ImplicitGrantRequestArgs,
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

  protected authHeaders?: Record<string, string>;

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

  generateAuthURL(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): AuthURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(32);
    const scope = options.scope ?? '';

    const params: Record<string, string> = {
      response_type: 'code',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
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

  generatePKCEAuthURL(redirectUri: string, options: Partial<OAuth2RequestArgs> = {}): PCKEAuthURLData {
    const res = this.generateAuthURL(redirectUri, { ...options });
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

  generateImplicitGrantAuthURL(
    redirectUri: string,
    options: Partial<ImplicitGrantRequestArgs> = {}
  ): ImplicitGrantURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(32);
    const scope = options.scope ?? '';
    const showDialog = options.showDialog ?? false;

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

  async getAccessToken({ code, redirectUri }: OAuth2AccessTokenArgs) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
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
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
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

  async generateClientCredentialsFlow() {
    const accessTokenResult = await this.post<ClientCredentialsFlowResponse>(
      API_TOKEN_URL,
      {
        grant_type: 'client_credentials',
      },
      {
        headers: this.authHeaders,
      }
    );

    return accessTokenResult;
  }

  async refreshOAuth2Token(refreshToken: string) {
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
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
    const accessTokenResult = await this.post<OAuth2AccessTokenResponse>(
      API_TOKEN_URL,
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
