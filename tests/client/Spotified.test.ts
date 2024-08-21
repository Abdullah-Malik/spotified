import { Spotified } from '../../src/client/Spotified';
import RequestMaker from '../../src/client-helpers/RequestMaker';
import Auth from '../../src/auth/Auth';
import { User, Artist, Track, Player, Market, Genre, Category } from '../../src/endpoints';

jest.mock('../../src/client-helpers/OAuth2Helper');
jest.mock('../../src/client-helpers/RequestMaker');
jest.mock('../../src/endpoints/User');
jest.mock('../../src/endpoints/Artist');
jest.mock('../../src/endpoints/Track');
jest.mock('../../src/endpoints/Player');
jest.mock('../../src/endpoints/Market');
jest.mock('../../src/endpoints/Genre');
jest.mock('../../src/endpoints/Category');
jest.mock('../../src/auth/Auth');

describe('Spotified', () => {
  let spotified: Spotified;
  const mockClientId = 'mock-client-id';
  const mockClientSecret = 'mock-client-secret';

  beforeEach(() => {
    spotified = new Spotified({ clientId: mockClientId, clientSecret: mockClientSecret });
    spotified['post'] = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a new Auth instance with correct parameters', () => {
      expect(Auth).toHaveBeenCalledTimes(1);
      expect(Auth).toHaveBeenCalledWith(
        {
          clientId: mockClientId,
          clientSecret: mockClientSecret,
        },
        expect.any(RequestMaker)
      );
    });
  });

  describe('user getter', () => {
    it('should create and return a User instance', () => {
      const { user } = spotified;
      expect(user).toBeInstanceOf(User);
      expect(User).toHaveBeenCalledTimes(1);
    });

    it('should return the same User instance on subsequent calls', () => {
      const user1 = spotified.user;
      const user2 = spotified.user;
      expect(user1).toBe(user2);
      expect(User).toHaveBeenCalledTimes(1);
    });
  });

  describe('artist getter', () => {
    it('should create and return an Artist instance', () => {
      const { artist } = spotified;
      expect(artist).toBeInstanceOf(Artist);
      expect(Artist).toHaveBeenCalledTimes(1);
    });

    it('should return the same Artist instance on subsequent calls', () => {
      const artist1 = spotified.artist;
      const artist2 = spotified.artist;
      expect(artist1).toBe(artist2);
      expect(Artist).toHaveBeenCalledTimes(1);
    });
  });

  describe('track getter', () => {
    it('should create and return a Track instance', () => {
      const { track } = spotified;
      expect(track).toBeInstanceOf(Track);
      expect(Track).toHaveBeenCalledTimes(1);
    });

    it('should return the same Track instance on subsequent calls', () => {
      const track1 = spotified.track;
      const track2 = spotified.track;
      expect(track1).toBe(track2);
      expect(Track).toHaveBeenCalledTimes(1);
    });
  });

  describe('player getter', () => {
    it('should create and return a Player instance', () => {
      const { player } = spotified;
      expect(player).toBeInstanceOf(Player);
      expect(Player).toHaveBeenCalledTimes(1);
    });

    it('should return the same Player instance on subsequent calls', () => {
      const player1 = spotified.player;
      const player2 = spotified.player;
      expect(player1).toBe(player2);
      expect(Player).toHaveBeenCalledTimes(1);
    });
  });

  describe('market getter', () => {
    it('should create and return a Market instance', () => {
      const { market } = spotified;
      expect(market).toBeInstanceOf(Market);
      expect(Market).toHaveBeenCalledTimes(1);
    });

    it('should return the same Market instance on subsequent calls', () => {
      const market1 = spotified.market;
      const market2 = spotified.market;
      expect(market1).toBe(market2);
      expect(Market).toHaveBeenCalledTimes(1);
    });
  });

  describe('genre getter', () => {
    it('should create and return a Genre instance', () => {
      const { genre } = spotified;
      expect(genre).toBeInstanceOf(Genre);
      expect(Genre).toHaveBeenCalledTimes(1);
    });

    it('should return the same Genre instance on subsequent calls', () => {
      const genre1 = spotified.genre;
      const genre2 = spotified.genre;
      expect(genre1).toBe(genre2);
      expect(Genre).toHaveBeenCalledTimes(1);
    });
  });

  describe('category getter', () => {
    it('should create and return a Category instance', () => {
      const { category } = spotified;
      expect(category).toBeInstanceOf(Category);
      expect(Category).toHaveBeenCalledTimes(1);
    });

    it('should return the same Category instance on subsequent calls', () => {
      const category1 = spotified.category;
      const category2 = spotified.category;
      expect(category1).toBe(category2);
      expect(Category).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('setBearerToken', () => {
    it('should set the bearer token on the RequestMaker', () => {
      const mockToken = 'mock-token';
      spotified.setBearerToken(mockToken);
      expect(spotified['_requestMaker'].setBearerToken).toHaveBeenCalledWith(mockToken);
    });
  });
});
