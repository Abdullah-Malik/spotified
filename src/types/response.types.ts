import { AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export type Response<T = any, D = any> = AxiosResponse<T, D>;

export interface SpotifyResponse<T> {
  data: T;
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
}
