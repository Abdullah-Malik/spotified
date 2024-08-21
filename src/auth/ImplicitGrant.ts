import { stringify } from 'querystring';
import OAuth2Helper from '../client-helpers/OAuth2Helper';
import { ImplicitGrantURLData, OAuth2AuthArgs } from '../types';
import { AUTHORIZE_URL } from '../constants';

export class ImplicitGrant {
  protected clientId?: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  generateImplicitGrantAuthURL(redirectUri: string, options: Partial<OAuth2AuthArgs> = {}): ImplicitGrantURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(64);
    const scope = options.scope ?? '';
    const showDialog = options.show_dialog ?? false;

    const params: Record<string, string> = {
      response_type: 'token',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
    };

    if (scope) {
      params.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    }

    if (showDialog) {
      params.show_dialog = showDialog.toString();
    }

    const url = `${AUTHORIZE_URL}?${stringify(params)}`;

    return {
      url,
      state,
    };
  }
}

export default ImplicitGrant;
