import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Market extends ReadWriteBaseClient {
  /**
   * Get the list of markets where Spotify is available.
   * https://developer.spotify.com/documentation/web-api/reference/get-available-markets
   */
  getAvailableMarkets() {
    this.get<{ markets: string[] }>('/markets');
  }
}

export default Market;
