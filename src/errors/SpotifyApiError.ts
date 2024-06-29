import { SpotifyApiErrorProps } from '../types';

export class SpotifyApiError extends Error implements SpotifyApiErrorProps {
  constructor(
    public status: number,
    public statusText: string,
    public endpoint: string,
    public requestParams?: any,
    public details?: any,
    public retryAfter?: number
  ) {
    super(`Spotify API Error ${status} (${endpoint}): ${statusText}`);
    this.name = 'SpotifyApiError';
    if (details?.error) {
      this.message += `: ${details.error.message || details.error}`;
    }
  }
}

export default SpotifyApiError;
