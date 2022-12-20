import axios from 'axios';
import { OAuth2Init } from '../types';

export async function send(requestParams: any) {
  const res = await axios.request(requestParams);
  return res;
}

export default class ClientRequestMaker {
  public clientId?: string;

  public clientSecret?: string;

  constructor(token: OAuth2Init) {
    this.clientId = token.clientId;
    this.clientSecret = token.clientSecret;
  }
}
