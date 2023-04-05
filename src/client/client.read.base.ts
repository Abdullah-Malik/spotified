import ClientRequestMaker from '../client-helpers/request-maker';
import { RequestArgs, SpotifyResponse } from '../types';

export abstract class SpotifiedReadOnlyBaseClient {
  protected _requestMaker: ClientRequestMaker;

  constructor(requestMaker: ClientRequestMaker) {
    this._requestMaker = requestMaker;
  }

  protected async get<T>(url: string, params?: Record<string, any>, requestArgs?: Partial<RequestArgs>): Promise<T>;

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
    requestArgs?: Partial<RequestArgs>
  ): Promise<SpotifyResponse<T>>;

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
    { fullResponse, ...rest }: Partial<RequestArgs> = {}
  ): Promise<T | SpotifyResponse<T>> {
    const options = {
      method: 'get',
      url,
      params,
      ...rest,
    };

    const res = await this._requestMaker.send<T>(options);

    return fullResponse ? { data: res.data, headers: res.headers } : res.data;
  }
}

export default SpotifiedReadOnlyBaseClient;
