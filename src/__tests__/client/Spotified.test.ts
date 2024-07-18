import { Spotified } from '../../client/Spotified';
import { OAuth2Helper } from '../../client-helpers/OAuth2Helper';
import { User, Artist } from '../../endpoints';
import { ClientCredentialsFlowResponse } from '../../types'

jest.mock('../../client-helpers/OAuth2Helper');
jest.mock('../../client-helpers/RequestMaker');
jest.mock('../../endpoints/User');
jest.mock('../../endpoints/Artist');

const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

describe('Spotified', () => {
  let spotified: Spotified;
  const mockClientId = 'mock-client-id';
  const mockClientSecret = 'mock-client-secret';
  const mockAuthHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic bW9jay1jbGllbnQtaWQ6bW9jay1jbGllbnQtc2VjcmV0',
  };

  beforeEach(() => {
    spotified = new Spotified({ clientId: mockClientId, clientSecret: mockClientSecret });
    spotified['post'] = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with OAuth2 credentials', () => {
      expect(spotified['clientId']).toBe(mockClientId);
      expect(spotified['clientSecret']).toBe(mockClientSecret);
      expect(spotified['authHeaders']).toBeDefined();
    });
  });

  describe('user getter', () => {
    it('should create and return a User instance', () => {
      const { user } = spotified;
      expect(user).toBeInstanceOf(User);
      expect(User).toHaveBeenCalledTimes(1);
    });

    it('should return the same User instance on subsequent calls', () => {
      const user1 = spotified.user;
      const user2 = spotified.user;
      expect(user1).toBe(user2);
      expect(User).toHaveBeenCalledTimes(1);
    });
  });

  describe('artist getter', () => {
    it('should create and return an Artist instance', () => {
      const { artist } = spotified;
      expect(artist).toBeInstanceOf(Artist);
      expect(Artist).toHaveBeenCalledTimes(1);
    });

    it('should return the same Artist instance on subsequent calls', () => {
      const artist1 = spotified.artist;
      const artist2 = spotified.artist;
      expect(artist1).toBe(artist2);
      expect(Artist).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateAuthURL', () => {
    const mockRedirectUri = 'http://example.com/callback';

    beforeEach(() => {
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue('mock-state');
    });

    it('should generate the correct authorization URL with default options', () => {
      const result = spotified.generateAuthURL(mockRedirectUri);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).not.toContain('scope');
      expect(result.state).toBe('mock-state');
    });

    it('should generate the correct authorization URL with custom options', () => {
      const options = {
        scope: ['user-read-private', 'user-read-email'],
      };

      const result = spotified.generateAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).toContain('scope=user-read-private%20user-read-email');
      expect(result.state).toBe('mock-state');
    });

    it('should generate the correct authorization URL with custom state', () => {
      const options = {
        state: 'custom-state',
      };

      const result = spotified.generateAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=custom-state');
      expect(result.state).toBe('custom-state');
    });

    it('should handle undefined scope', () => {
      const options = {
        scope: undefined,
      };

      const result = spotified.generateAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).not.toContain('scope');
      expect(result.state).toBe('mock-state');
    });
  });

  describe('generatePKCEAuthLink', () => {
    it('should generate a correct PKCE auth link', () => {
      const redirectUri = 'http://example.com/callback';
      const mockCodeVerifier = 'mock-code-verifier';
      const mockCodeChallenge = 'mock-code-challenge';
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);

      const result = spotified.generatePKCEAuthURL(redirectUri);
      expect(result.url).toContain('https://accounts.spotify.com/authorize');
      expect(result.url).toContain(`code_challenge=${mockCodeChallenge}`);
      expect(result.url).toContain('code_challenge_method=S256');
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });
  });

  describe('generatePKCEAuthURL', () => {
    const mockRedirectUri = 'http://example.com/callback';
    const mockCodeVerifier = 'mock-code-verifier';
    const mockCodeChallenge = 'mock-code-challenge';

    beforeEach(() => {
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue('mock-state');
      (OAuth2Helper.getCodeVerifier as jest.Mock).mockReturnValue(mockCodeVerifier);
      (OAuth2Helper.getCodeChallengeFromVerifier as jest.Mock).mockReturnValue(mockCodeChallenge);
    });

    it('should generate the correct PKCE authorization URL with default options', () => {
      const result = spotified.generatePKCEAuthURL(mockRedirectUri);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).toContain(`code_challenge=${encodeURIComponent(mockCodeChallenge)}`);
      expect(result.url).toContain('code_challenge_method=S256');
      expect(result.state).toBe('mock-state');
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });

    it('should generate the correct PKCE authorization URL with custom options', () => {
      const options = {
        scope: ['user-read-private', 'user-read-email'],
      };

      const result = spotified.generatePKCEAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).toContain(`code_challenge=${encodeURIComponent(mockCodeChallenge)}`);
      expect(result.url).toContain('code_challenge_method=S256');
      expect(result.url).toContain('scope=user-read-private%20user-read-email');
      expect(result.state).toBe('mock-state');
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });

    it('should generate the correct PKCE authorization URL with custom state', () => {
      const options = {
        state: 'custom-state',
      };

      const result = spotified.generatePKCEAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=custom-state');
      expect(result.url).toContain(`code_challenge=${encodeURIComponent(mockCodeChallenge)}`);
      expect(result.url).toContain('code_challenge_method=S256');
      expect(result.state).toBe('custom-state');
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });

    it('should handle undefined scope', () => {
      const options = {
        scope: undefined,
      };

      const result = spotified.generatePKCEAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=code');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).toContain(`code_challenge=${encodeURIComponent(mockCodeChallenge)}`);
      expect(result.url).toContain('code_challenge_method=S256');
      expect(result.url).not.toContain('scope');
      expect(result.state).toBe('mock-state');
      expect(result.codeVerifier).toBe(mockCodeVerifier);
      expect(result.codeChallenge).toBe(mockCodeChallenge);
    });
  });

  describe('generateClientCredentialsFlow', () => {
    it('should make a POST request to get client credentials flow token with correct headers', async () => {
      const mockResponse: ClientCredentialsFlowResponse = {
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600
      };
  
      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);
  
      const result = await spotified.generateClientCredentialsFlow();
  
      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'client_credentials'
        },
        { headers: mockAuthHeaders }
      );
      expect(result).toEqual(mockResponse);
    });
  
    it('should handle errors during client credentials flow token request', async () => {
      const mockError = new Error('API Error');
  
      (spotified['post'] as jest.Mock).mockRejectedValue(mockError);
  
      await expect(spotified.generateClientCredentialsFlow()).rejects.toThrow('API Error');
    });
  
    it('should use the correct URL for client credentials flow token request', async () => {
      const mockResponse: ClientCredentialsFlowResponse = {
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600
      };
  
      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);
  
      await spotified.generateClientCredentialsFlow();
  
      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.any(Object),
        expect.any(Object)
      );
    });
  
    it('should include the correct grant_type in the request body', async () => {
      const mockResponse: ClientCredentialsFlowResponse = {
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600
      };
  
      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);
  
      await spotified.generateClientCredentialsFlow();
  
      expect(spotified['post']).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          grant_type: 'client_credentials'
        }),
        expect.any(Object)
      );
    });
  });

  describe('generateImplicitGrantAuthURL', () => {
    const mockRedirectUri = 'http://example.com/callback';

    beforeEach(() => {
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue('mock-state');
    });

    it('should generate the correct implicit grant authorization URL with default options', () => {
      const result = spotified.generateImplicitGrantAuthURL(mockRedirectUri);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=token');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).not.toContain('scope');
      expect(result.url).not.toContain('show_dialog');
      expect(result.state).toBe('mock-state');
    });

    it('should generate the correct implicit grant authorization URL with custom options', () => {
      const options = {
        scope: ['user-read-private', 'user-read-email'],
        showDialog: true,
      };

      const result = spotified.generateImplicitGrantAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=token');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=mock-state');
      expect(result.url).toContain('scope=user-read-private%20user-read-email');
      expect(result.url).toContain('show_dialog=true');
      expect(result.state).toBe('mock-state');
    });

    it('should generate the correct implicit grant authorization URL with custom state', () => {
      const options = {
        state: 'custom-state',
      };

      const result = spotified.generateImplicitGrantAuthURL(mockRedirectUri, options);

      expect(result.url).toContain(`${AUTHORIZE_URL}`);
      expect(result.url).toContain('response_type=token');
      expect(result.url).toContain(`client_id=${mockClientId}`);
      expect(result.url).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
      expect(result.url).toContain('state=custom-state');
      expect(result.state).toBe('custom-state');
    });
  });

  describe('getAccessToken', () => {
    it('should make a POST request to get access token with correct headers', async () => {
      const mockCode = 'mock-code';
      const mockRedirectUri = 'http://example.com/callback';
      const mockResponse = { access_token: 'mock-access-token' };

      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await spotified.getAccessToken({ code: mockCode, redirectUri: mockRedirectUri });

      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          code: mockCode,
          redirect_uri: mockRedirectUri,
          grant_type: 'authorization_code',
          client_id: mockClientId,
          client_secret: mockClientSecret,
        }),
        { headers: mockAuthHeaders }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPKCEAccessToken', () => {
    it('should make a POST request to get PKCE access token with correct headers', async () => {
      const mockCode = 'mock-code';
      const mockCodeVerifier = 'mock-code-verifier';
      const mockRedirectUri = 'http://example.com/callback';
      const mockResponse = { access_token: 'mock-access-token' };

      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await spotified.getPKCEAccessToken({
        code: mockCode,
        codeVerifier: mockCodeVerifier,
        redirectUri: mockRedirectUri,
      });

      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          code: mockCode,
          code_verifier: mockCodeVerifier,
          redirect_uri: mockRedirectUri,
          grant_type: 'authorization_code',
          client_id: mockClientId,
          client_secret: mockClientSecret,
        }),
        { headers: mockAuthHeaders }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshOAuth2Token', () => {
    it('should make a POST request to refresh OAuth2 token with correct headers', async () => {
      const mockRefreshToken = 'mock-refresh-token';
      const mockResponse = { access_token: 'new-mock-access-token' };

      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await spotified.refreshOAuth2Token(mockRefreshToken);

      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          grant_type: 'refresh_token',
          refresh_token: mockRefreshToken,
        }),
        { headers: mockAuthHeaders }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshPKCEOAuth2Token', () => {
    it('should make a POST request to refresh PKCE OAuth2 token with correct headers', async () => {
      const mockRefreshToken = 'mock-refresh-token';
      const mockResponse = { access_token: 'new-mock-access-token' };

      (spotified['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await spotified.refreshPKCEOAuth2Token(mockRefreshToken);

      expect(spotified['post']).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          grant_type: 'refresh_token',
          refresh_token: mockRefreshToken,
          client_id: mockClientId,
        }),
        { headers: mockAuthHeaders }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setBearerToken', () => {
    it('should set the bearer token on the RequestMaker', () => {
      const mockToken = 'mock-token';
      spotified.setBearerToken(mockToken);
      expect(spotified['_requestMaker'].setBearerToken).toHaveBeenCalledWith(mockToken);
    });
  });
});
