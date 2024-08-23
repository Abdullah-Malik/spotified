import RequestMaker from '../client-helpers/RequestMaker.js';
import { OAuth2Credentials } from '../types/index.js';
import AuthorizationCode from './AuthorizationCode.js';
import AuthorizationCodePKCE from './AuthorizationCodePKCE.js';
import ClientCredentials from './ClientCredentials.js';
import { ImplicitGrant } from './ImplicitGrant.js';

export class Auth {
  protected _authorizationCode: AuthorizationCode;

  protected _authorizationCodePKCE: AuthorizationCodePKCE;

  protected _implicitGrant: ImplicitGrant;

  protected _clientCredentials: ClientCredentials;

  constructor(credentials: OAuth2Credentials, requestMaker: RequestMaker) {
    this._authorizationCode = new AuthorizationCode(credentials, requestMaker);
    this._authorizationCodePKCE = new AuthorizationCodePKCE(credentials.clientId, requestMaker);
    this._clientCredentials = new ClientCredentials(credentials, requestMaker);
    this._implicitGrant = new ImplicitGrant(credentials.clientId);
  }

  public get AuthorizationCode() {
    return this._authorizationCode;
  }

  public get AuthorizationCodePKCE() {
    return this._authorizationCodePKCE;
  }

  public get ImplicitGrant() {
    return this._implicitGrant;
  }

  public get ClientCredentials() {
    return this._clientCredentials;
  }
}

export default Auth;
