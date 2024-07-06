export interface OAuth2Init {
  clientId: string;
  clientSecret?: string;
}

export interface BearerToken {
  bearerToken: string;
}

export type ClientToken = OAuth2Init | BearerToken;

export function isBearerToken(token: ClientToken): token is BearerToken {
  return 'bearerToken' in token;
}

export function isOAuth2Init(token: ClientToken): token is OAuth2Init {
  return 'clientId' in token;
}
