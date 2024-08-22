import { User } from '../../src/endpoints/User';
import { joinIdsArrayToString, generateQueryParametersString } from '../../src/utils';
import {
  CurrentUserProfile,
  UserProfile,
  UsersTopItemsType,
  FollowedArtistType,
  ArtistsUsersType,
  TopItemsOptionalParams,
} from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCurrentUserProfile', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockResponse: CurrentUserProfile = {
        country: 'US',
        display_name: 'Test User',
        email: 'test@example.com',
        explicit_content: { filter_enabled: false, filter_locked: false },
        external_urls: { spotify: 'https://open.spotify.com/user/testuser' },
        followers: { href: null, total: 5 },
        href: 'https://api.spotify.com/v1/users/testuser',
        id: 'testuser',
        images: [],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:testuser',
      };
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.getCurrentUserProfile();

      expect(user['get']).toHaveBeenCalledWith('/me');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUsersTopItems', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockType: UsersTopItemsType = 'tracks';
      const mockParams: TopItemsOptionalParams = { time_range: 'medium_term', limit: 10 };
      const mockResponse = {
        items: [],
        total: 0,
        limit: 10,
        offset: 0,
        href: 'https://api.spotify.com/v1/me/top/tracks',
        next: null,
        previous: null,
      };
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.getUsersTopItems(mockType, mockParams);

      expect(user['get']).toHaveBeenCalledWith(`/me/top/${mockType}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserProfile', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockUserId = 'testuser';
      const mockResponse: UserProfile = {
        display_name: 'Test User',
        external_urls: { spotify: 'https://open.spotify.com/user/testuser' },
        followers: { href: null, total: 5 },
        href: 'https://api.spotify.com/v1/users/testuser',
        id: 'testuser',
        images: [],
        type: 'user',
        uri: 'spotify:user:testuser',
      };
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.getUserProfile(mockUserId);

      expect(user['get']).toHaveBeenCalledWith(`/users/${mockUserId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('followPlaylist', () => {
    it('should call put method with correct params', async () => {
      const mockPlaylistId = 'playlist123';
      const mockParams = { public: true };

      await user.followPlaylist(mockPlaylistId, mockParams);

      expect(user['put']).toHaveBeenCalledWith(`/playlists/${mockPlaylistId}/followers`, mockParams);
    });
  });

  describe('unfollowPlaylist', () => {
    it('should call delete method with correct params', async () => {
      const mockPlaylistId = 'playlist123';

      await user.unfollowPlaylist(mockPlaylistId);

      expect(user['delete']).toHaveBeenCalledWith(`/playlists/${mockPlaylistId}/followers`);
    });
  });

  describe('getFollowedArtists', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockType: FollowedArtistType = 'artist';
      const mockParams = { limit: 20, after: 'lastArtistId' };
      const mockResponse = {
        artists: {
          items: [],
          next: null,
          total: 0,
          cursors: { after: null },
          limit: 20,
          href: 'https://api.spotify.com/v1/me/following?type=artist',
        },
      };
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.getFollowedArtists(mockType, mockParams);

      expect(user['get']).toHaveBeenCalledWith('/me/following', { type: mockType, ...mockParams });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('followArtistsUsers', () => {
    it('should call put method with correct params', async () => {
      const mockType: ArtistsUsersType = 'artist';
      const mockIds = ['artist1', 'artist2'];
      (generateQueryParametersString as jest.Mock).mockReturnValue('?type=artist');

      await user.followArtistsUsers(mockType, mockIds);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ type: mockType });
      expect(user['put']).toHaveBeenCalledWith('/me/following?type=artist', { ids: mockIds });
    });
  });

  describe('unfollowArtistsUsers', () => {
    it('should call delete method with correct params', async () => {
      const mockType: ArtistsUsersType = 'user';
      const mockIds = ['user1', 'user2'];
      (generateQueryParametersString as jest.Mock).mockReturnValue('?type=user');

      await user.unfollowArtistsUsers(mockType, mockIds);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ type: mockType });
      expect(user['delete']).toHaveBeenCalledWith('/me/following?type=user', { ids: mockIds });
    });
  });

  describe('checkIfUserFollows', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockType: ArtistsUsersType = 'artist';
      const mockIds = ['artist1', 'artist2'];
      const mockResponse = [true, false];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('artist1,artist2');
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.checkIfUserFollows(mockType, mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(user['get']).toHaveBeenCalledWith('/me/following/contains', { type: mockType, ids: 'artist1,artist2' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('checkIfCurrentUserFollowsPlaylist', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockPlaylistId = 'playlist123';
      const mockUserId = 'user123';
      const mockResponse = [true];
      (user['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await user.checkIfCurrentUserFollowsPlaylist(mockPlaylistId, mockUserId);

      expect(user['get']).toHaveBeenCalledWith(`/playlists/${mockPlaylistId}/followers/contains`, { ids: mockUserId });
      expect(result).toEqual(mockResponse);
    });
  });
});
