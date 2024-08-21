import RequestMaker from '../client-helpers/RequestMaker';
import { OAuth2Credentials } from '../types';
import AuthorizationCode from './AuthorizationCode';
import AuthorizationCodePKCE from './AuthorizationCodePKCE';
import ClientCredentials from './ClientCredentials';
import { ImplicitGrant } from './ImplicitGrant';

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
