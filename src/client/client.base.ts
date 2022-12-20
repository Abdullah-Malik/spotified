import { OAuth2Init } from '../types';
import ClientRequestMaker, { send } from '../client-mixins/request-maker.mixin';

export default abstract class SpotifyClientBase {
  protected _requestMaker: ClientRequestMaker;

  constructor(oauth2Init: OAuth2Init);

  public constructor(token: OAuth2Init) {
    this._requestMaker = new ClientRequestMaker(token);
  }

  public async post(url: string, body?: any) {
    const options = {
      method: 'post',
      url,
      data: {
        code: body.code,
        redirect_uri: body.redirect_uri,
        code_verifier: body.code_verifier,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${this._requestMaker.clientId}:${this._requestMaker.clientSecret}`
        ).toString('base64')}`,
      },
    };
    const res = await send(options);

    return res;
  }
}
