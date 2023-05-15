import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Market extends ReadWriteBaseClient {
  getAvailableMarkets() {
    this.get<{ markets: string[] }>('/markets');
  }
}

export default Market;
