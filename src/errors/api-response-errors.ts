import { ApiResponseErrorProps } from '../types';

export default class ApiResponseError extends Error implements ApiResponseErrorProps {
  code?: number;

  request: any;

  response: any;

  headers: any;

  data: any;

  rateLimit?: any;

  // TODO: Make this const
  type = 'response';

  public constructor(message: string, options: ApiResponseErrorProps) {
    super(message);
    this.code = options.code;
    this.request = options.request;
    this.response = options.response;
    this.headers = options.headers;
    this.data = options.data;
    this.rateLimit = options.rateLimit;
  }

  get rateLimitError() {
    return this.code === 420 || this.code === 429;
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
