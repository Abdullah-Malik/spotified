export class NetworkError extends Error {
  constructor(message: string, public url: string, public requestParams: any) {
    super(message);
    this.name = 'NetworkError';
  }
}

export default NetworkError;
