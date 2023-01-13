import { ApiResponseErrorProps } from '../types';

export class ApiResponseError extends Error implements ApiResponseErrorProps {
  code?: number;

  headers: any;

  data: any;

  rateLimit?: any;

  type = 'response' as const;

  protected _request: any;

  protected _response: any;

  public constructor(message: string, options: ApiResponseErrorProps) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, '_request', { value: options.request });
    Object.defineProperty(this, '_response', { value: options.response });

    this.code = options.code;
    this.headers = options.headers;
    this.data = options.data;
    this.rateLimit = options.rateLimit;
  }

  get rateLimitError() {
    return this.code === 420 || this.code === 429;
  }

  get request(): any {
    return this._request;
  }

  get response(): any {
    return this._response;
  }

  // TODO: methods to add: isAuthError, get Response, get Request
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
