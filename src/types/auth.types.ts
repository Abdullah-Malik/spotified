import { TypeOrArrayOf } from './shared.types';

export type SOAuth2Scope =
  | 'ugc-image-upload'
  | 'user-read-playback-state'
  | 'user-modify-playback-state'
  | 'user-read-currently-playing'
  | 'app-remote-control'
  | 'streaming'
  | 'playlist-read-private'
  | 'playlist-read-collaborative'
  | 'playlist-modify-private'
  | 'playlist-modify-public'
  | 'user-follow-modify'
  | 'user-follow-read'
  | 'user-read-playback-position'
  | 'user-top-read'
  | 'user-read-recently-played'
  | 'user-library-modify'
  | 'user-library-read'
  | 'user-read-email'
  | 'user-read-private';

export interface OAuth2RequestArgs {
  scope?: TypeOrArrayOf<SOAuth2Scope> | TypeOrArrayOf<string>;
  state?: string;
}

export interface OAuth2RequestTokenResult {
  url: string;
  state: string;
}

export interface OAuth2PCKERequestTokenResult {
  url: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
}

export interface OAuth2AccessTokenArgs {
  /** The same URI given to generate link at previous step. */
  redirectUri: string;
  /** The code given by Twitter in query string, after redirection to your callback URL. */
  code: string;
}

export interface OAuth2PKCEAccessTokenArgs {
  /** The same URI given to generate link at previous step. */
  redirectUri: string;
  /** The code obtained in link generation step. */
  codeVerifier: string;
  /** The code given by Twitter in query string, after redirection to your callback URL. */
  code: string;
}

export interface OAuth2AccessTokenResult {
  token_type: 'bearer';
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token?: string;
}
