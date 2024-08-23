import { Crypto } from '../../src/client-helpers/Crypto';

describe('Crypto', () => {
  const originalWindow = global.window;
  const originalRequire = global.require;

  afterEach(() => {
    global.window = originalWindow;
    global.require = originalRequire;
  });

  describe('current', () => {
    it('should return window.crypto when subtle crypto is available', () => {
      const mockCrypto = { subtle: {} };
      global.window = { crypto: mockCrypto } as any;

      expect(Crypto.current).toBe(mockCrypto);
    });

    it('should return node webcrypto when subtle crypto is not available', () => {
      global.window = undefined as any;
      const mockWebCrypto = { subtle: {} };
      jest.spyOn(Crypto as any, 'tryLoadNodeWebCrypto').mockReturnValue(mockWebCrypto);

      expect(Crypto.current).toBe(mockWebCrypto);
    });

    it('should throw an error when neither browser nor node crypto is available', () => {
      global.window = undefined as any;
      jest.spyOn(Crypto as any, 'tryLoadNodeWebCrypto').mockImplementation(() => {
        throw new Error('Crypto not available');
      });

      expect(() => Crypto.current).toThrow('Crypto not available');
    });
  });

  describe('hasSubtleCrypto', () => {
    it('should return true when subtle crypto is available', () => {
      global.window = { crypto: { subtle: {} } } as any;

      expect(Crypto['hasSubtleCrypto']).toBe(true);
    });

    it('should return false when subtle crypto is not available', () => {
      global.window = {} as any;

      expect(Crypto['hasSubtleCrypto']).toBe(false);
    });

    it('should return false when window is not defined', () => {
      global.window = undefined as any;

      expect(Crypto['hasSubtleCrypto']).toBe(false);
    });
  });
});
