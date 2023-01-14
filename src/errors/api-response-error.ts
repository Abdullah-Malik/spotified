import { ApiResponseErrorProps, ResponseHeaders, Response } from '../types';

export class ApiResponseError extends Error implements ApiResponseErrorProps {
  code?: number;

  headers?: ResponseHeaders;

  data: any;

  rateLimit?: any;

  type = 'response' as const;

  protected _request: any;

  protected _response?: Response;

  public constructor(message: string, options: ApiResponseErrorProps) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, '_request', { value: options.request });
    Object.defineProperty(this, '_response', { value: options.response });

    this.code = options.code;
    this.headers = options.headers;
    this.data = options.data;
  }

  get rateLimitError() {
    return this.code === 420 || this.code === 429;
  }

  get request(): any {
    return this._request;
  }

  get response(): Response | undefined {
    return this._response;
  }

  toJSON() {
    return {
      type: this.type,
      code: this.code,
      error: this.data,
      rateLimit: this.rateLimit,
      headers: this.headers,
    };
  }
}

export default ApiResponseError;
