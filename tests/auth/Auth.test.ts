import { Auth } from '../../src/auth/Auth';
import { OAuth2Credentials } from '../../src/types';
import AuthorizationCode from '../../src/auth/AuthorizationCode';
import AuthorizationCodePKCE from '../../src/auth/AuthorizationCodePKCE';
import ClientCredentials from '../../src/auth/ClientCredentials';
import { ImplicitGrant } from '../../src/auth/ImplicitGrant';
import RequestMaker from '../../src/client-helpers/RequestMaker';

jest.mock('../../src/auth/AuthorizationCode');
jest.mock('../../src/auth/AuthorizationCodePKCE');
jest.mock('../../src/auth/ClientCredentials');
jest.mock('../../src/auth/ImplicitGrant');

describe('Auth', () => {
  let auth: Auth;
  let credentials: OAuth2Credentials;
  let requestMaker: RequestMaker;

  beforeEach(() => {
    credentials = {
      clientId: 'testClientId',
      clientSecret: 'testClientSecret',
    };
    requestMaker = new RequestMaker();
    auth = new Auth(credentials, requestMaker);
  });

  it('initializes AuthorizationCode with the provided credentials and request maker', () => {
    expect(AuthorizationCode).toHaveBeenCalledWith(credentials, requestMaker);
  });

  it('initializes AuthorizationCodePKCE with the provided client ID and request maker', () => {
    expect(AuthorizationCodePKCE).toHaveBeenCalledWith(credentials.clientId, requestMaker);
  });

  it('initializes ClientCredentials with the provided credentials and request maker', () => {
    expect(ClientCredentials).toHaveBeenCalledWith(credentials, requestMaker);
  });

  it('initializes ImplicitGrant with the provided client ID', () => {
    expect(ImplicitGrant).toHaveBeenCalledWith(credentials.clientId);
  });

  it('returns the AuthorizationCode instance through the getter', () => {
    expect(auth.AuthorizationCode).toBeInstanceOf(AuthorizationCode);
  });

  it('returns the AuthorizationCodePKCE instance through the getter', () => {
    expect(auth.AuthorizationCodePKCE).toBeInstanceOf(AuthorizationCodePKCE);
  });

  it('returns the ImplicitGrant instance through the getter', () => {
    expect(auth.ImplicitGrant).toBeInstanceOf(ImplicitGrant);
  });

  it('returns the ClientCredentials instance through the getter', () => {
    expect(auth.ClientCredentials).toBeInstanceOf(ClientCredentials);
  });
});
