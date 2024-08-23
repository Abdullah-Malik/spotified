import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient.js';

export class Market extends ReadWriteBaseClient {
  /**
   * Get the list of markets where Spotify is available.
   * https://developer.spotify.com/documentation/web-api/reference/get-available-markets
   */
  getAvailableMarkets() {
    return this.get<{ markets: string[] }>('/markets');
  }
}

export default Market;
