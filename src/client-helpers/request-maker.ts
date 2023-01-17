import axios from 'axios';
import { ApiResponseError, ApiRequestError } from '../errors';
import {
  OAuth2Init,
  BearerToken,
  isBearerToken,
  isOAuth2Init,
  isResponseError,
  Response,
  isRequestError,
} from '../types';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export default class ClientRequestMaker {
  public clientId?: string;

  public clientSecret?: string;

  public bearerToken?: string;

  private axiosInstance = axios.create({
    baseURL: SPOTIFY_API_URL,
    headers: {
      common: {
        'Content-Type': 'application/json',
      },
    },
  });

  constructor(token: OAuth2Init | BearerToken) {
    if (isBearerToken(token)) {
      this.bearerToken = token.bearerToken;
      this.setAuthorizationHeader();
    } else if (isOAuth2Init(token)) {
      this.clientId = token.clientId;
      this.clientSecret = token.clientSecret;
    }
  }

  private setAuthorizationHeader() {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${this.bearerToken}`;
  }

  setBearerToken(bearerToken: string) {
    this.bearerToken = bearerToken;
    this.setAuthorizationHeader();
  }

  async send<T = any>(requestParams: any): Promise<Promise<Response<T>>> {
    try {
      const res = await this.axiosInstance.request<T>(requestParams);
      return res;
    } catch (err) {
      if (isResponseError(err)) {
        throw new ApiResponseError(
          `Request failed with code ${err.response?.status} - Invalid Request: ${err.response?.data.error.message}`,
          {
            code: err.response?.status,
            request: err.request,
            response: err.response,
            headers: err.response?.headers,
            data: err.response?.data,
          }
        );
      } else if (isRequestError(err)) {
        throw new ApiRequestError(`Request failed with code ${err.code}`, {
          request: err.request,
          requestError: err.cause,
        });
      }
      throw new Error('Some other error');
    }
  }
}
