import { OAuth2Init } from '../types';
import { ClientRequestMaker } from '../client-mixins/request-maker.mixin';

export default abstract class SpotifyClientBase {
  protected _requestMaker: ClientRequestMaker;

  constructor(oauth2Init: OAuth2Init);

  public constructor(token: OAuth2Init) {
    this._requestMaker = new ClientRequestMaker(token);
  }
}
