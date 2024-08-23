import { Crypto } from './Crypto';

export class OAuth2Helper {
  static getCodeVerifier() {
    return this.generateRandomString(128);
  }

  static async getCodeChallengeFromVerifier(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await Crypto.current.subtle.digest('SHA-256', data);

    const digestBytes = [...new Uint8Array(digest)];

    const digestAsBase64 =
      typeof Buffer !== 'undefined'
        ? Crypto.current.createHash('sha256').update(codeVerifier).digest('base64')
        : btoa(String.fromCharCode.apply(null, digestBytes));

    return this.escapeBase64Url(digestAsBase64);
  }

  static generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    for (let i = 0; i < length; i += 1) {
      text += possible[Math.floor(Math.random() * possible.length)];
    }
    return text;
  }

  private static escapeBase64Url(string: string) {
    return string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
}

export default OAuth2Helper;
