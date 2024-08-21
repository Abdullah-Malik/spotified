import { ClientCredentials } from '../../src/auth/ClientCredentials';
import { API_TOKEN_URL } from '../../src/constants';
import { encodeStringToBase64 } from '../../src/utils';
import RequestMaker from '../../src/client-helpers/RequestMaker';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('ClientCredentials', () => {
  let clientCredentials: ClientCredentials;
  let mockRequestMaker: jest.Mocked<RequestMaker>;

  beforeEach(() => {
    mockRequestMaker = {} as jest.Mocked<RequestMaker>;
    clientCredentials = new ClientCredentials(
      { clientId: 'test-client-id', clientSecret: 'test-client-secret' },
      mockRequestMaker
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should set clientId and clientSecret', () => {
      expect(clientCredentials['clientId']).toBe('test-client-id');
      expect(clientCredentials['clientSecret']).toBe('test-client-secret');
    });
  });

  describe('clientCredentialsFlow', () => {
    it('should call post method with correct params and return expected result', async () => {
      const mockResponse = {
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
      };
      (clientCredentials['post'] as jest.Mock).mockResolvedValue(mockResponse);
      (encodeStringToBase64 as jest.Mock).mockReturnValue('encoded-credentials');

      const result = await clientCredentials.requestAccessToken();

      expect(encodeStringToBase64).toHaveBeenCalledWith('test-client-id:test-client-secret');
      expect(clientCredentials['post']).toHaveBeenCalledWith(
        API_TOKEN_URL,
        {
          grant_type: 'client_credentials',
        },
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic encoded-credentials',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if client secret is undefined', async () => {
      clientCredentials = new ClientCredentials({ clientId: 'test-client-id' }, mockRequestMaker);

      await expect(clientCredentials.requestAccessToken()).rejects.toThrow(
        'Client secret is required for requesting authorization'
      );
    });
  });
});
