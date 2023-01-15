import ClientRequestMaker from '../client-helpers/request-maker';
import { ClientToken, isOAuth2Init, RequestArgs } from '../types';

export abstract class SpotifiedClientBase {
  protected _requestMaker!: ClientRequestMaker;

  public constructor(token: ClientToken | SpotifiedClientBase) {
    if (token instanceof SpotifiedClientBase) {
      this._requestMaker = token._requestMaker;
    } else if (isOAuth2Init(token)) {
      this._requestMaker = new ClientRequestMaker(token);
    }
  }

  protected async get<T>(url: string, params?: Record<string, any>, requestArgs?: RequestArgs): Promise<T> {
    const options = {
      method: 'get',
      url,
      params,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }

  protected async post<T>(url: string, data?: Record<string, any>, requestArgs?: RequestArgs): Promise<T> {
    const options = {
      method: 'post',
      url,
      data,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }

  protected async put<T>(url: string, data?: Record<string, any>, requestArgs?: RequestArgs): Promise<T> {
    const options = {
      method: 'put',
      url,
      data,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }

  protected async delete<T>(url: string, data?: Record<string, any>, requestArgs?: RequestArgs): Promise<T> {
    const options = {
      method: 'delete',
      url,
      data,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }
}

export default SpotifiedClientBase;
