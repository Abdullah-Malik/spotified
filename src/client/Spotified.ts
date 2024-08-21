import { ReadWriteBaseClient } from './ReadWriteBaseClient';
import { OAuth2Credentials } from '../types';
import { User, Artist, Track, Player, Market, Genre, Category } from '../endpoints';
import RequestMaker from '../client-helpers/RequestMaker';
import Auth from '../auth/Auth';

export class Spotified extends ReadWriteBaseClient {
  protected _auth: Auth;

  protected _user?: User;

  protected _artist?: Artist;

  protected _track?: Track;

  protected _player?: Player;

  protected _market?: Market;

  protected _genre?: Genre;

  protected _category?: Category;

  constructor(credentials: OAuth2Credentials) {
    super(new RequestMaker());
    this._auth = new Auth(credentials, this._requestMaker);
  }

  public get auth() {
    return this._auth;
  }

  public get user() {
    if (this._user) {
      return this._user;
    }
    this._user = new User(this._requestMaker);
    return this._user;
  }

  public get artist() {
    if (this._artist) {
      return this._artist;
    }
    this._artist = new Artist(this._requestMaker);
    return this._artist;
  }

  public get track() {
    if (this._track) {
      return this._track;
    }
    this._track = new Track(this._requestMaker);
    return this._track;
  }

  public get player() {
    if (this._player) {
      return this._player;
    }
    this._player = new Player(this._requestMaker);
    return this._player;
  }

  public get market() {
    if (this._market) {
      return this._market;
    }
    this._market = new Market(this._requestMaker);
    return this._market;
  }

  public get genre() {
    if (this._genre) {
      return this._genre;
    }
    this._genre = new Genre(this._requestMaker);
    return this._genre;
  }

  public get category() {
    if (this._category) {
      return this._category;
    }
    this._category = new Category(this._requestMaker);
    return this._category;
  }

  setBearerToken(bearerToken: string) {
    this._requestMaker.setBearerToken(bearerToken);
  }
}

export default Spotified;
