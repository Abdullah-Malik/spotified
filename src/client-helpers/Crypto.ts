/* eslint-disable */
export class Crypto {
  public static get current() {
    return this.hasSubtleCrypto ? window.crypto : this.tryLoadNodeWebCrypto();
  }

  private static get hasSubtleCrypto() {
    return (
      typeof window !== 'undefined' &&
      typeof window.crypto !== 'undefined' &&
      typeof window.crypto.subtle !== 'undefined'
    );
  }

  private static tryLoadNodeWebCrypto() {
    try {
      const { webcrypto } = require('crypto');
      return webcrypto;
    } catch (e) {
      throw e;
    }
  }
}

export default Crypto;
