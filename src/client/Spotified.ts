import { ReadWriteBaseClient } from './ReadWriteBaseClient.js';
import { OAuth2Credentials } from '../types/index.js';
import {
  User,
  Artist,
  Track,
  Player,
  Market,
  Genre,
  Category,
  Search,
  Show,
  Episode,
  Playlist,
  Chapter,
  Album,
  Audiobook,
} from '../endpoints/index.js';
import RequestMaker from '../client-helpers/RequestMaker.js';
import Auth from '../auth/Auth.js';

export class Spotified extends ReadWriteBaseClient {
  protected _auth: Auth;

  protected _user?: User;

  protected _artist?: Artist;

  protected _track?: Track;

  protected _player?: Player;

  protected _market?: Market;

  protected _genre?: Genre;

  protected _category?: Category;

  protected _album?: Album;

  protected _audiobook?: Audiobook;

  protected _chapter?: Chapter;

  protected _playlist?: Playlist;

  protected _episode?: Episode;

  protected _show?: Show;

  protected _search?: Search;

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

  public get album() {
    if (this._album) {
      return this._album;
    }
    this._album = new Album(this._requestMaker);
    return this._album;
  }

  public get audiobook() {
    if (this._audiobook) {
      return this._audiobook;
    }
    this._audiobook = new Audiobook(this._requestMaker);
    return this._audiobook;
  }

  public get chapter() {
    if (this._chapter) {
      return this._chapter;
    }
    this._chapter = new Chapter(this._requestMaker);
    return this._chapter;
  }

  public get playlist() {
    if (this._playlist) {
      return this._playlist;
    }
    this._playlist = new Playlist(this._requestMaker);
    return this._playlist;
  }

  public get episode() {
    if (this._episode) {
      return this._episode;
    }
    this._episode = new Episode(this._requestMaker);
    return this._episode;
  }

  public get show() {
    if (this._show) {
      return this._show;
    }
    this._show = new Show(this._requestMaker);
    return this._show;
  }

  public get search() {
    if (this._search) {
      return this._search;
    }
    this._search = new Search(this._requestMaker);
    return this._search;
  }

  setBearerToken(bearerToken: string) {
    this._requestMaker.setBearerToken(bearerToken);
  }
}

export default Spotified;
