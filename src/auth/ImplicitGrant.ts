import OAuth2Helper from '../client-helpers/OAuth2Helper.js';
import { ImplicitGrantURLData, OAuth2AuthArgs } from '../types/index.js';
import { AUTHORIZE_URL } from '../constants.js';

export class ImplicitGrant {
  protected clientId?: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  generateAuthorizationURL(redirectUri: string, options: Partial<OAuth2AuthArgs> = {}): ImplicitGrantURLData {
    const state = options.state ?? OAuth2Helper.generateRandomString(64);
    const scope = options.scope ?? '';
    const showDialog = options.show_dialog ?? false;

    const params = new URLSearchParams({
      response_type: 'token',
      client_id: this.clientId as string,
      redirect_uri: redirectUri,
      state,
    });

    if (scope) {
      params.append('scope', Array.isArray(scope) ? scope.join(' ') : scope);
    }

    if (showDialog) {
      params.append('show_dialog', showDialog.toString());
    }

    const url = `${AUTHORIZE_URL}?${params.toString()}`;

    return {
      url,
      state,
    };
  }
}

export default ImplicitGrant;
