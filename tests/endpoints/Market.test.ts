import { Market } from '../../src/endpoints/Market';

jest.mock('../../src/client/ReadWriteBaseClient');

describe('Market', () => {
  let market: Market;

  beforeEach(() => {
    market = new Market({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAvailableMarkets', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockResponse = {
        markets: ['US', 'GB', 'DE', 'FR'],
      };
      (market['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await market.getAvailableMarkets();

      expect(market['get']).toHaveBeenCalledWith('/markets');
      expect(result).toEqual(mockResponse);
    });
  });
});
