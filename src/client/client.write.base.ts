import { RequestArgs } from '../types';
import SpotifiedReadOnlyBaseClient from './client.read.base';

export abstract class SpotifiedReadWriteBaseClient extends SpotifiedReadOnlyBaseClient {
  protected async post<T>(url: string, data?: Record<string, any>, requestArgs?: Partial<RequestArgs>): Promise<T> {
    const options = {
      method: 'post',
      url,
      data,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }

  protected async put<T>(url: string, data?: Record<string, any>, requestArgs?: Partial<RequestArgs>): Promise<T> {
    const options = {
      method: 'put',
      url,
      data,
      ...requestArgs,
    };

    const res = await this._requestMaker.send<T>(options);

    return res.data;
  }

  protected async delete<T>(url: string, data?: Record<string, any>, requestArgs?: Partial<RequestArgs>): Promise<T> {
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

export default SpotifiedReadWriteBaseClient;
