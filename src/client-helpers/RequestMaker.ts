import { SpotifyApiError, NetworkError } from '../errors';
import { BearerToken, SpotifiedResponse } from '../types';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export default class RequestMaker {
  protected bearerToken?: string;

  constructor(token?: BearerToken) {
    this.bearerToken = token?.bearerToken;
  }

  setBearerToken(bearerToken: string) {
    this.bearerToken = bearerToken;
  }

  async send<T = any>(requestParams: any): Promise<SpotifiedResponse<T>> {
    const defaultHeaders: Record<string, string | undefined> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    };

    if (requestParams.headers && requestParams.headers['Content-Type']) {
      delete defaultHeaders['Content-Type'];
    }
    if (requestParams.headers && requestParams.headers.Authorization) {
      delete defaultHeaders.Authorization;
    }

    const finalHeaders = { ...defaultHeaders, ...requestParams.headers };

    try {
      const url = requestParams.url.startsWith('http') ? requestParams.url : `${SPOTIFY_API_URL}${requestParams.url}`;

      const res = await fetch(url, {
        method: requestParams.method,
        headers: finalHeaders,
        body: JSON.stringify(requestParams.data),
      });

      if (!res.ok) {
        let errorData: any = {};
        try {
          errorData = await res.json();
        } catch (parseError) {
          errorData.message = 'Failed to parse error response';
        }

        const retryAfter = res.headers.get('Retry-After');

        throw new SpotifyApiError(
          res.status,
          res.statusText,
          requestParams.url,
          requestParams,
          errorData,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      }

      const data = await res.json();
      const { headers } = res;
      return { data, headers } as SpotifiedResponse<T>;
    } catch (err) {
      if (err instanceof SpotifyApiError) {
        throw err;
      } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
        throw new NetworkError('Failed to connect to Spotify API', requestParams.url, requestParams);
      } else {
        // Unexpected Error
        throw new Error('Unexpected error during request');
      }
    }
  }
}
