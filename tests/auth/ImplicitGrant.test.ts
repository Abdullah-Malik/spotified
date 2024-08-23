import { ImplicitGrant } from '../../src/auth/ImplicitGrant';
import OAuth2Helper from '../../src/client-helpers/OAuth2Helper';
import { AUTHORIZE_URL } from '../../src/constants';

jest.mock('../../src/client-helpers/OAuth2Helper');

describe('ImplicitGrant', () => {
  let implicitGrant: ImplicitGrant;

  beforeEach(() => {
    implicitGrant = new ImplicitGrant('test-client-id');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should set clientId', () => {
      expect(implicitGrant['clientId']).toBe('test-client-id');
    });
  });

  describe('generateAuthorizationURL', () => {
    it('should generate a valid authorization URL with default parameters', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);

      const result = implicitGrant.generateAuthorizationURL('http://localhost:3000/callback');

      expect(OAuth2Helper.generateRandomString).toHaveBeenCalledWith(64);
      expect(result.url).toBe(
        `${AUTHORIZE_URL}?response_type=token&client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=mock-state`
      );
      expect(result.state).toBe(mockState);
    });

    it('should use provided state if available', () => {
      const providedState = 'provided-state';

      const result = implicitGrant.generateAuthorizationURL('http://localhost:3000/callback', { state: providedState });

      expect(OAuth2Helper.generateRandomString).not.toHaveBeenCalled();
      expect(result.url).toContain(`state=${providedState}`);
      expect(result.state).toBe(providedState);
    });

    it('should include scope when provided as an array', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);

      const result = implicitGrant.generateAuthorizationURL('http://localhost:3000/callback', {
        scope: ['user-read-private', 'user-read-email'],
      });

      expect(result.url).toContain('scope=user-read-private+user-read-email');
    });

    it('should include scope when provided as a string', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);

      const result = implicitGrant.generateAuthorizationURL('http://localhost:3000/callback', {
        scope: 'user-read-private',
      });

      expect(result.url).toContain('scope=user-read-private');
    });

    it('should include show_dialog when provided', () => {
      const mockState = 'mock-state';
      (OAuth2Helper.generateRandomString as jest.Mock).mockReturnValue(mockState);

      const result = implicitGrant.generateAuthorizationURL('http://localhost:3000/callback', {
        show_dialog: true,
      });

      expect(result.url).toContain('show_dialog=true');
    });
  });
});
