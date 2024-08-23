import { OAuth2Helper } from '../../src/client-helpers/OAuth2Helper';
import { Crypto } from '../../src/client-helpers/Crypto';

jest.mock('../../src/client-helpers/Crypto', () => ({
  Crypto: {
    current: {
      subtle: {
        digest: jest.fn(),
      },
      createHash: jest.fn(),
    },
  },
}));

describe('OAuth2Helper', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getCodeVerifier', () => {
    it('should return a string of length 128', () => {
      const result = OAuth2Helper.getCodeVerifier();
      expect(result.length).toBe(128);
    });

    it('should only contain valid characters', () => {
      const result = OAuth2Helper.getCodeVerifier();
      expect(result).toMatch(/^[A-Za-z0-9\-._~]+$/);
    });
  });

  describe('getCodeChallengeFromVerifier', () => {
    const mockDigest = new Uint8Array([1, 2, 3, 4, 5]);
    const mockDigestBase64 = 'AQIDBAU=';

    beforeEach(() => {
      (Crypto.current.subtle.digest as jest.Mock).mockResolvedValue(mockDigest);
      (Crypto.current.createHash as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockDigestBase64),
      });
    });

    it('should return a base64url encoded string', async () => {
      const result = await OAuth2Helper.getCodeChallengeFromVerifier('test_verifier');
      expect(result).not.toContain('=');
      expect(result).not.toContain('+');
      expect(result).not.toContain('/');
    });

    it('should use SHA-256 for hashing', async () => {
      await OAuth2Helper.getCodeChallengeFromVerifier('test_verifier');
      expect(Crypto.current.subtle.digest).toHaveBeenCalledWith('SHA-256', expect.any(Uint8Array));
    });

    it('should use Buffer in Node.js environment', async () => {
      const originalBuffer = global.Buffer;
      global.Buffer = {} as any;

      await OAuth2Helper.getCodeChallengeFromVerifier('test_verifier');

      expect(Crypto.current.createHash).toHaveBeenCalledWith('sha256');
      global.Buffer = originalBuffer;
    });

    it('should use btoa in browser environment', async () => {
      const originalBuffer = global.Buffer;
      global.Buffer = undefined as any;

      const spy = jest.spyOn(global, 'btoa');
      await OAuth2Helper.getCodeChallengeFromVerifier('test_verifier');

      expect(spy).toHaveBeenCalled();
      global.Buffer = originalBuffer;
    });
  });

  describe('generateRandomString', () => {
    it('should return a string of the specified length', () => {
      const result = OAuth2Helper.generateRandomString(10);
      expect(result.length).toBe(10);
    });

    it('should only contain valid characters', () => {
      const result = OAuth2Helper.generateRandomString(100);
      expect(result).toMatch(/^[A-Za-z0-9\-._~]+$/);
    });
  });

  describe('escapeBase64Url', () => {
    it('should replace "=" with ""', () => {
      const result = (OAuth2Helper as any).escapeBase64Url('abc==');
      expect(result).toBe('abc');
    });

    it('should replace "+" with "-"', () => {
      const result = (OAuth2Helper as any).escapeBase64Url('a+b+c');
      expect(result).toBe('a-b-c');
    });

    it('should replace "/" with "_"', () => {
      const result = (OAuth2Helper as any).escapeBase64Url('a/b/c');
      expect(result).toBe('a_b_c');
    });
  });
});
