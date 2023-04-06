import { ApiRequestErrorProps } from '../types';

export class ApiRequestError extends Error implements ApiRequestErrorProps {
  type = 'request' as const;

  requestError: any;

  protected _request: any;

  public constructor(message: string, options: ApiRequestErrorProps) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, '_request', { value: options.request });

    this.requestError = options.requestError;
  }

  get request(): any {
    return this._request;
  }

  toJSON() {
    return {
      type: this.type,
      requestError: this.requestError,
    };
  }
}

export default ApiRequestError;
