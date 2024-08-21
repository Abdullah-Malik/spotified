import { Spotified } from '../../src/client/Spotified';
import { User, Artist } from '../../src/endpoints';
import RequestMaker from '../../src/client-helpers/RequestMaker';
import Auth from '../../src/auth/Auth';

jest.mock('../../src/client-helpers/OAuth2Helper');
jest.mock('../../src/client-helpers/RequestMaker');
jest.mock('../../src/endpoints/User');
jest.mock('../../src/endpoints/Artist');
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

  describe('setBearerToken', () => {
    it('should set the bearer token on the RequestMaker', () => {
      const mockToken = 'mock-token';
      spotified.setBearerToken(mockToken);
      expect(spotified['_requestMaker'].setBearerToken).toHaveBeenCalledWith(mockToken);
    });
  });
});
