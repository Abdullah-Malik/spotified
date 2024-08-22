import RequestMaker from '../client-helpers/RequestMaker';
import { RequestArgs, SpotifiedResponse } from '../types';
import { generateQueryParametersString } from '../utils';

export abstract class ReadOnlyBaseClient {
  protected _requestMaker: RequestMaker;

  constructor(requestMaker: RequestMaker) {
    this._requestMaker = requestMaker;
  }

  protected async get<T>(url: string, params?: Record<string, any>, requestArgs?: Partial<RequestArgs>): Promise<T>;

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
    requestArgs?: Partial<RequestArgs>
  ): Promise<SpotifiedResponse<T>>;

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
    { fullResponse, ...rest }: Partial<RequestArgs> = {}
  ): Promise<T | SpotifiedResponse<T>> {
    const urlWithParams = `${url}${generateQueryParametersString({ ...params })}`;

    const options = {
      method: 'get',
      url: urlWithParams,
      ...rest,
    };

    const res = await this._requestMaker.makeRequest<T>(options);

    return fullResponse ? { data: res.data, headers: res.headers } : res.data;
  }
}

export default ReadOnlyBaseClient;
