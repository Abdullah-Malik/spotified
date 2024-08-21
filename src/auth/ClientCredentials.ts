import { ClientCredentialsFlowResponse, OAuth2Credentials } from '../types';
import { ReadWriteBaseClient } from '../client';
import RequestMaker from '../client-helpers/RequestMaker';
import { API_TOKEN_URL } from '../constants';

export class ClientCredentials extends ReadWriteBaseClient {
  protected clientId?: string;

  protected clientSecret?: string;

  constructor(credentials: OAuth2Credentials, requestMaker: RequestMaker) {
    super(requestMaker);
    this.clientId = credentials.clientId;
    this.clientSecret = credentials.clientSecret;
  }

  async clientCredentialsFlow() {
    if (this.clientSecret === undefined) {
      throw new Error('Client secret is required for requesting authorization');
    }

    const accessTokenResult = await this.post<ClientCredentialsFlowResponse>(
      API_TOKEN_URL,
      {
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
      }
    );

    return accessTokenResult;
  }
}

export default ClientCredentials;
