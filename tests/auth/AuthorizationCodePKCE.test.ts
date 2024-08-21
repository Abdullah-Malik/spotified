import { stringify } from 'querystring';
import { AuthorizationCodePKCE } from '../../src/auth/AuthorizationCodePKCE';
import OAuth2Helper from '../../src/client-helpers/OAuth2Helper';
import { API_TOKEN_URL, AUTHORIZE_URL } from '../../src/constants';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/client-helpers/OAuth2Helper');
jest.mock('querystring');

describe('AuthorizationCodePKCE', () => {
  let authCodePKCE: AuthorizationCodePKCE;

  beforeEach(() => {
    authCodePKCE = new AuthorizationCodePKCE('test-client-id', {} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('generateAuthorizationURL', () => {
    it('should generate a valid authorization URL with default parameters', () => {
      const mockState = 'mock-state';
      const mockCodeVerifier = 'mock-code-verifier';
      const mockCodeChallenge = 'mock-code-challenge';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&code_challenge=mock-code-challenge&code_challenge_method=S256'
      );

      const result = authCodePKCE.generateAuthorizationURL('http://localhost:3000/callback');

      expect(stringify).toHaveBeenCalledWith({
        response_type: 'code',
        client_id: 'test-client-id',
        redirect_uri: 'http://localhost:3000/callback',
        state: mockState,
        code_challenge: mockCodeChallenge,
        code_challenge_method: 'S256',
      });
      expect(result.url).toBe(
        `${AUTHORIZE_URL}?response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&code_challenge=mock-code-challenge&code_challenge_method=S256`
      );
      expect(result.state).toBe(mockState);
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });

    it('should use provided state if available', () => {
      const providedState = 'provided-state';
      const mockCodeVerifier = 'mock-code-verifier';
      const mockCodeChallenge = 'mock-code-challenge';
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);
      (stringify as jest.Mock).mockReturnValue(
        `response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=${providedState}&code_challenge=mock-code-challenge&code_challenge_method=S256`
      );

      const result = authCodePKCE.generateAuthorizationURL('http://localhost:3000/callback', { state: providedState });

      expect(result.state).toBe(providedState);
      expect(OAuth2Helper.generateRandomString).not.toHaveBeenCalled();
    });

    it('should include scope when provided as an array', () => {
      const mockState = 'mock-state';
      const mockCodeVerifier = 'mock-code-verifier';
      const mockCodeChallenge = 'mock-code-challenge';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&code_challenge=mock-code-challenge&code_challenge_method=S256&scope=user-read-private%20user-read-email'
      );

      const result = authCodePKCE.generateAuthorizationURL('http://localhost:3000/callback', {
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
      const mockCodeVerifier = 'mock-code-verifier';
      const mockCodeChallenge = 'mock-code-challenge';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);
      (stringify as jest.Mock).mockReturnValue(
        'response_type=code&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state&code_challenge=mock-code-challenge&code_challenge_method=S256&scope=user-read-private'
      );

      const result = authCodePKCE.generateAuthorizationURL('http://localhost:3000/callback', {
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
      (authCodePKCE['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authCodePKCE.requestAccessToken(
        'test-code',
        'test-code-verifier',
        'http://localhost:3000/callback'
      );

      expect(authCodePKCE['post']).toHaveBeenCalledWith(
        API_TOKEN_URL,
        {
          code: 'test-code',
          code_verifier: 'test-code-verifier',
          redirect_uri: 'http://localhost:3000/callback',
          grant_type: 'authorization_code',
          client_id: 'test-client-id',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      expect(result).toEqual(mockResponse);
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
      (authCodePKCE['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authCodePKCE.refreshAccessToken('mock-refresh-token');

      expect(authCodePKCE['post']).toHaveBeenCalledWith(
        API_TOKEN_URL,
        {
          grant_type: 'refresh_token',
          refresh_token: 'mock-refresh-token',
          client_id: 'test-client-id',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
