import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Market extends ReadWriteBaseClient {
  getAvailableMarkets() {
    return this.get<{ markets: string[] }>('/markets');
  }
}

export default Market;
