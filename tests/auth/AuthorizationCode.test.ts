import { stringify } from 'querystring';
import { AuthorizationCode } from '../../src/auth/AuthorizationCode';
import OAuth2Helper from '../../src/client-helpers/OAuth2Helper';
import { API_TOKEN_URL, AUTHORIZE_URL } from '../../src/constants';
import { encodeStringToBase64 } from '../../src/utils';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/client-helpers/OAuth2Helper');
jest.mock('querystring');
jest.mock('../../src/utils');

describe('AuthorizationCode', () => {
  let authCode: AuthorizationCode;

  beforeEach(() => {
    authCode = new AuthorizationCode({ clientId: 'test-client-id', clientSecret: 'test-client-secret' }, {} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('generateAuthorizationURL', () => {
    it('should generate a valid authorization URL with default parameters', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state'
      );

      const result = authCode.generateAuthorizationURL('http://localhost:3000/callback');

      expect(stringify).toHaveBeenCalledWith({
        response_type: 'code',
        client_id: 'test-client-id',
        redirect_uri: 'http://localhost:3000/callback',
        state: mockState,
      });
      expect(result.url).toBe(
        `${AUTHORIZE_URL}?response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state`
      );
      expect(result.state).toBe(mockState);
    });

    it('should use provided state if available', () => {
      const providedState = 'provided-state';
      (stringify as jest.Mock).mockReturnValue(
        `response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=${providedState}`
      );

      const result = authCode.generateAuthorizationURL('http://localhost:3000/callback', { state: providedState });

      expect(OAuth2Helper.generateRandomString).not.toHaveBeenCalled();
      expect(stringify).toHaveBeenCalledWith(
        expect.objectContaining({
          state: providedState,
        })
      );
      expect(result.state).toBe(providedState);
    });

    it('should include show_dialog when provided', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&show_dialog=true'
      );

      const result = authCode.generateAuthorizationURL('http://localhost:3000/callback', {
        show_dialog: true,
      });

      expect(stringify).toHaveBeenCalledWith({
        response_type: 'code',
        client_id: 'test-client-id',
        redirect_uri: 'http://localhost:3000/callback',
        state: mockState,
        show_dialog: 'true',
      });
      expect(result.url).toContain('show_dialog=true');
    });

    it('should include scope when provided as an array', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&scope=user-read-private%20user-read-email'
      );

      const result = authCode.generateAuthorizationURL('http://localhost:3000/callback', {
        scope: ['user-read-private', 'user-read-email'],
      });

      expect(stringify).toHaveBeenCalledWith(
        expect.objectContaining({
          scope: 'user-read-private user-read-email',
        })
      );
      expect(result.url).toContain('scope=user-read-private%20user-read-email');
    });

    it('should include scope when provided as a string', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&scope=user-read-private'
      );

      const result = authCode.generateAuthorizationURL('http://localhost:3000/callback', {
        scope: 'user-read-private',
      });

      expect(stringify).toHaveBeenCalledWith(
        expect.objectContaining({
          scope: 'user-read-private',
        })
      );
      expect(result.url).toContain('scope=user-read-private');
    });
  });

  describe('requestAccessToken', () => {
    it('should call post method with correct params and return expected result', async () => {
      const mockResponse = {
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        scope: 'user-read-private user-read-email',
      };
      (authCode['post'] as jest.Mock).mockResolvedValue(mockResponse);
      (encodeStringToBase64 as jest.Mock).mockReturnValue('encoded-credentials');

      const result = await authCode.requestAccessToken({
        code: 'test-code',
        redirectUri: 'http://localhost:3000/callback',
      });

      expect(encodeStringToBase64).toHaveBeenCalledWith('test-client-id:test-client-secret');
      expect(authCode['post']).toHaveBeenCalledWith(
        API_TOKEN_URL,
        {
          code: 'test-code',
          redirect_uri: 'http://localhost:3000/callback',
          grant_type: 'authorization_code',
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
      authCode = new AuthorizationCode({ clientId: 'test-client-id' }, {} as any);

      await expect(
        authCode.requestAccessToken({
          code: 'test-code',
          redirectUri: 'http://localhost:3000/callback',
        })
      ).rejects.toThrow('Client secret is required for requesting an access token');
    });
  });

  describe('refreshAccessToken', () => {
    it('should call post method with correct params and return expected result', async () => {
      const mockResponse = {
        access_token: 'new-mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'user-read-private user-read-email',
      };
      (authCode['post'] as jest.Mock).mockResolvedValue(mockResponse);
      (encodeStringToBase64 as jest.Mock).mockReturnValue('encoded-credentials');

      const result = await authCode.refreshAccessToken('mock-refresh-token');

      expect(encodeStringToBase64).toHaveBeenCalledWith('test-client-id:test-client-secret');
      expect(authCode['post']).toHaveBeenCalledWith(
        API_TOKEN_URL,
        {
          grant_type: 'refresh_token',
          refresh_token: 'mock-refresh-token',
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
      authCode = new AuthorizationCode({ clientId: 'test-client-id' }, {} as any);

      await expect(authCode.refreshAccessToken('mock-refresh-token')).rejects.toThrow(
        'Client secret is required for requesting an access token'
      );
    });
  });
});
