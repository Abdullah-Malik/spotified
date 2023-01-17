import type { AxiosResponseHeaders, RawAxiosResponseHeaders, AxiosError } from 'axios';
import { isAxiosError } from 'axios';
import { Response } from './response.types';

export type ResponseHeaders = AxiosResponseHeaders | RawAxiosResponseHeaders;

export interface ApiResponseErrorProps {
  code?: number;
  request: any;
  response?: Response;
  headers?: ResponseHeaders;
  data: any;
}

export interface ApiRequestErrorProps {
  request: any;
  requestError: any;
}

export type ResponseError<T = unknown, D = any> = AxiosError<T, D>;

export type RequestError<T = unknown, D = any> = AxiosError<T, D>;

export function isResponseError<T = any, D = any>(payload: any): payload is ResponseError<T, D> {
  return isAxiosError(payload) && !!payload.response;
}

export function isRequestError<T = any, D = any>(payload: any): payload is RequestError<T, D> {
  return isAxiosError(payload) && !payload.response;
}
