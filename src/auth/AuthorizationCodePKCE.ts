import { stringify } from 'querystring';
import { API_TOKEN_URL, AUTHORIZE_URL } from '../constants';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import { OAuth2AccessTokenResponse, OAuth2AuthPCKEArgs, PCKEAuthURLData } from '../types';
import RequestMaker from '../client-helpers/RequestMaker';
import OAuth2Helper from '../client-helpers/OAuth2Helper';

export class AuthorizationCodePKCE extends ReadWriteBaseClient {
  protected clientId?: string;

  constructor(clientId: string, requestMaker: RequestMaker) {
    super(requestMaker);
    this.clientId = clientId;
  }

  async generateAuthorizationURL(
    redirectUri: string,
    options: Partial<OAuth2AuthPCKEArgs> = {}
  ): Promise<PCKEAuthURLData> {
    const state = options.state ?? OAuth2Helper.generateRandomString(64);
    const scope = options.scope ?? '';
    const codeVerifier = OAuth2Helper.getCodeVerifier();
    const codeChallenge = await OAuth2Helper.getCodeChallengeFromVerifier(codeVerifier);

    const params: Record<string, string | boolean> = {
      response_type: 'code',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    };

    if (scope) {
      params.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    }

    const url = `${AUTHORIZE_URL}?${stringify(params)}`;

    return {
      url,
      state,
      codeVerifier,
      codeChallenge,
    };
  }

  async requestAccessToken(code: string, codeVerifier: string, redirectUri: string) {
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

  async refreshAccessToken(refreshToken: string) {
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
}

export default AuthorizationCodePKCE;
