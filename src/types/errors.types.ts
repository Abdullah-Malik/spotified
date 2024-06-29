export interface SpotifyApiErrorProps {
  status: number;
  statusText: string;
  endpoint: string;
  requestParams?: any;
  details?: any;
  retryAfter?: number;
}

export default SpotifyApiErrorProps;
