import { ReadOnlyBaseClient } from '../../src/client/ReadOnlyBaseClient';
import RequestMaker from '../../src/client-helpers/RequestMaker';
import { SpotifiedResponse, RequestArgs, DataResponse } from '../../src/types';

// Mock the RequestMaker class
jest.mock('../../src/client-helpers/RequestMaker');

describe('ReadOnlyBaseClient', () => {
  let client: ReadOnlyBaseClient;
  let mockRequestMaker: jest.Mocked<RequestMaker>;

  beforeEach(() => {
    mockRequestMaker = new RequestMaker() as jest.Mocked<RequestMaker>;
    client = new (class extends ReadOnlyBaseClient {})(mockRequestMaker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get method', () => {
    const mockUrl = '/test';
    const mockParams = { param1: 'value1' };
    const mockData = { id: 1, name: 'Test' };
    const mockHeaders = new Headers({ 'Content-Type': 'application/json' });

    it('should call RequestMaker.makeRequest with correct parameters', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      await client['get'](mockUrl, mockParams);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'get',
        url: `${mockUrl}?param1=value1`,
      });
    });

    it('should return only data when fullResponse is not set', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      const result = await client['get']<typeof mockData>(mockUrl);

      expect(result).toEqual(mockData);
    });

    it('should return full response when fullResponse is set to true', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      const requestArgs: Partial<RequestArgs> = { fullResponse: true };
      const result = await client['get']<typeof mockData>(mockUrl, undefined, requestArgs);

      expect(result).toEqual({ data: mockData, headers: mockHeaders });
    });

    it('should construct URL without params when no params are provided', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      await client['get'](mockUrl);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'get',
        url: '/test',
      });
    });

    it('should construct URL with multiple params of different types', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      const mockQueryParams = {
        stringParam: 'value1',
        numberParam: 123,
        booleanParam: true,
        arrayParam: ['a', 'b'],
      };
      await client['get'](mockUrl, mockQueryParams);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'get',
        url: '/test?stringParam=value1&numberParam=123&booleanParam=true&arrayParam=a%2Cb',
      });
    });

    it('should pass additional request arguments to RequestMaker.makeRequest', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      const additionalArgs: Partial<RequestArgs> = {
        headers: { 'Custom-Header': 'Value' },
        fullResponse: false,
      };
      await client['get'](mockUrl, mockParams, additionalArgs);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'get',
        url: `${mockUrl}?param1=value1`,
        headers: { 'Custom-Header': 'Value' },
      });
    });

    it('should handle errors thrown by RequestMaker.makeRequest', async () => {
      const mockError = new Error('Request failed');
      mockRequestMaker.makeRequest.mockRejectedValue(mockError);

      await expect(client['get'](mockUrl)).rejects.toThrow('Request failed');
    });

    it('should return DataResponse when fullResponse is false', async () => {
      const mockDataResponse: DataResponse<typeof mockData> = { data: mockData };
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockData, headers: mockHeaders });

      const result = await client['get']<typeof mockData>(mockUrl);

      expect(result).toEqual(mockDataResponse.data);
    });

    it('should return SpotifiedResponse when fullResponse is true', async () => {
      const mockSpotifiedResponse: SpotifiedResponse<typeof mockData> = { data: mockData, headers: mockHeaders };
      mockRequestMaker.makeRequest.mockResolvedValue(mockSpotifiedResponse);

      const requestArgs: Partial<RequestArgs> = { fullResponse: true };
      const result = await client['get']<typeof mockData>(mockUrl, undefined, requestArgs);

      expect(result).toEqual(mockSpotifiedResponse);
    });
  });
});
