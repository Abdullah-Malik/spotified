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
  codeVerifier: string;
  codeChallenge: string;
}
