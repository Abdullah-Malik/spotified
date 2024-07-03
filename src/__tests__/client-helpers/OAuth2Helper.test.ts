import * as crypto from 'crypto';
import { OAuth2Helper } from '../../client-helpers/OAuth2Helper';

describe('OAuth2Helper', () => {
  describe('getCodeVerifier', () => {
    it('should generate a code verifier of the specified length', () => {
      const codeVerifier = OAuth2Helper.getCodeVerifier();
      expect(codeVerifier).toHaveLength(128);
    });

    it('should generate a code verifier with valid characters', () => {
      const codeVerifier = OAuth2Helper.getCodeVerifier();
      const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      for (let i = 0; i < codeVerifier.length; i += 1) {
        expect(validCharacters).toContain(codeVerifier[i]);
      }
    });
  });

  describe('getCodeChallengeFromVerifier', () => {
    it('should generate a code challenge from the code verifier', () => {
      const codeVerifier = 'test_code_verifier';
      const expectedCodeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
      const codeChallenge = OAuth2Helper.getCodeChallengeFromVerifier(codeVerifier);
      expect(codeChallenge).toBe(expectedCodeChallenge);
    });
  });

  describe('getAuthHeader', () => {
    it('should generate the correct authorization header', () => {
      const clientId = 'test_client_id';
      const clientSecret = 'test_client_secret';
      const expectedAuthHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const authHeader = OAuth2Helper.getAuthHeader(clientId, clientSecret);
      expect(authHeader).toBe(expectedAuthHeader);
    });
  });

  describe('generateRandomString', () => {
    it('should generate a random string of the specified length', () => {
      const length = 10;
      const randomString = OAuth2Helper.generateRandomString(length);
      expect(randomString).toHaveLength(length);
    });

    it('should generate a random string with valid characters', () => {
      const length = 10;
      const randomString = OAuth2Helper.generateRandomString(length);
      const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      for (let i = 0; i < randomString.length; i += 1) {
        expect(validCharacters).toContain(randomString[i]);
      }
    });
  });
});
