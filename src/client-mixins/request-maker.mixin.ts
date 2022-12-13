import { OAuth2Init } from "types";

export class ClientRequestMaker {
  public clientId?: string;
  public clientSecret?: string;

  constructor(token: OAuth2Init){
    this.clientId = token.clientId;
    this.clientSecret = token.clientSecret;
  }
}