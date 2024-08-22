import { ReadWriteBaseClient } from '../../src/client/ReadWriteBaseClient';
import RequestMaker from '../../src/client-helpers/RequestMaker';
import { RequestArgs } from '../../src/types';

jest.mock('../../src/client-helpers/RequestMaker');

describe('ReadWriteBaseClient', () => {
  let client: ReadWriteBaseClient;
  let mockRequestMaker: jest.Mocked<RequestMaker>;

  beforeEach(() => {
    mockRequestMaker = new RequestMaker() as jest.Mocked<RequestMaker>;
    client = new (class extends ReadWriteBaseClient {})(mockRequestMaker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUrl = '/test';
  const mockData = { key: 'value' };
  const mockResponse = { id: 1, name: 'Test' };
  const mockHeaders = new Headers({ 'Content-Type': 'application/json' });

  describe('post method', () => {
    it('should call RequestMaker.makeRequest with correct parameters', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      await client['post'](mockUrl, mockData);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'post',
        url: mockUrl,
        data: mockData,
      });
    });

    it('should return the data from the response', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const result = await client['post']<typeof mockResponse>(mockUrl, mockData);

      expect(result).toEqual(mockResponse);
    });

    it('should pass additional request arguments to RequestMaker.makeRequest', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const additionalArgs: Partial<RequestArgs> = {
        headers: { 'Custom-Header': 'Value' },
      };
      await client['post'](mockUrl, mockData, additionalArgs);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'post',
        url: mockUrl,
        data: mockData,
        headers: { 'Custom-Header': 'Value' },
      });
    });
  });

  describe('put method', () => {
    it('should call RequestMaker.makeRequest with correct parameters', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      await client['put'](mockUrl, mockData);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'put',
        url: mockUrl,
        data: mockData,
      });
    });

    it('should return the data from the response', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const result = await client['put']<typeof mockResponse>(mockUrl, mockData);

      expect(result).toEqual(mockResponse);
    });

    it('should pass additional request arguments to RequestMaker.makeRequest', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const additionalArgs: Partial<RequestArgs> = {
        headers: { 'Custom-Header': 'Value' },
      };
      await client['put'](mockUrl, mockData, additionalArgs);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'put',
        url: mockUrl,
        data: mockData,
        headers: { 'Custom-Header': 'Value' },
      });
    });
  });

  describe('delete method', () => {
    it('should call RequestMaker.makeRequest with correct parameters', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      await client['delete'](mockUrl, mockData);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'delete',
        url: mockUrl,
        data: mockData,
      });
    });

    it('should return the data from the response', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const result = await client['delete']<typeof mockResponse>(mockUrl, mockData);

      expect(result).toEqual(mockResponse);
    });

    it('should pass additional request arguments to RequestMaker.makeRequest', async () => {
      mockRequestMaker.makeRequest.mockResolvedValue({ data: mockResponse, headers: mockHeaders });

      const additionalArgs: Partial<RequestArgs> = {
        headers: { 'Custom-Header': 'Value' },
      };
      await client['delete'](mockUrl, mockData, additionalArgs);

      expect(mockRequestMaker.makeRequest).toHaveBeenCalledWith({
        method: 'delete',
        url: mockUrl,
        data: mockData,
        headers: { 'Custom-Header': 'Value' },
      });
    });
  });
});
