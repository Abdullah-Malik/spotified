import type { AxiosResponseHeaders, AxiosResponse, RawAxiosResponseHeaders } from 'axios';

export type ResponseHeaders = AxiosResponseHeaders | RawAxiosResponseHeaders;

export type Response = AxiosResponse;

export interface ApiResponseErrorProps {
  code?: number;
  request: any;
  response?: Response;
  headers?: ResponseHeaders;
  data: any;
}
