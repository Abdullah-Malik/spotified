import { getRequestBody } from '../utils.js';
import { SpotifyApiError, NetworkError } from '../errors/index.js';
import { BearerToken, SpotifiedResponse } from '../types/index.js';
import { SPOTIFY_API_URL } from '../constants.js';

function isFormUrlEncoded(contentType: string | undefined): boolean {
  return contentType === 'application/x-www-form-urlencoded';
}

export default class RequestMaker {
  protected bearerToken?: string;

  constructor(token?: BearerToken) {
    this.bearerToken = token?.bearerToken;
  }

  setBearerToken(bearerToken: string) {
    this.bearerToken = bearerToken;
  }

  private prepareHeadersAndBody(requestParams: { headers?: Record<string, string>; data?: any }): {
    finalHeaders: Record<string, string>;
    body: string | URLSearchParams | undefined;
  } {
    const { headers: customHeaders = {}, data } = requestParams;

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    };

    if (customHeaders['Content-Type']) {
      delete defaultHeaders['Content-Type'];
    }
    if (customHeaders.Authorization || isFormUrlEncoded(customHeaders['Content-Type'])) {
      delete defaultHeaders.Authorization;
    }

    const finalHeaders = { ...defaultHeaders, ...customHeaders };

    let body: string | URLSearchParams | undefined;
    if (isFormUrlEncoded(finalHeaders['Content-Type'])) {
      body = new URLSearchParams(data).toString();
    } else {
      body = getRequestBody(data);
    }

    return { finalHeaders, body };
  }

  async makeRequest<T = any>(requestParams: any): Promise<SpotifiedResponse<T>> {
    const { finalHeaders, body } = this.prepareHeadersAndBody(requestParams);

    try {
      const url = requestParams.url.startsWith('http') ? requestParams.url : `${SPOTIFY_API_URL}${requestParams.url}`;

      const res = await fetch(url, {
        method: requestParams.method,
        headers: finalHeaders as any,
        body,
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
