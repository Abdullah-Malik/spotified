import { Show } from '../../src/endpoints/Show';
import { joinIdsArrayToString, generateQueryParametersString } from '../../src/utils';
import {
  Show as ShowDetail,
  SimplifiedShow,
  ShowEpisodes,
  UserSavedShows,
  GetShowParams,
  GetShowEpisodesOptionalParams,
  GetUsersSavedShowsOptionalParams,
  RemoveUsersShowsOptionalParams,
} from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Show', () => {
  let show: Show;

  beforeEach(() => {
    show = new Show({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getShow', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'show123';
      const mockParams: GetShowParams = { market: 'US' };
      const mockResponse: ShowDetail = {
        available_markets: ['US'],
        copyrights: [],
        description: 'Test show',
        html_description: '<p>Test show</p>',
        explicit: false,
        external_urls: { spotify: 'https://open.spotify.com/show/show123' },
        href: 'https://api.spotify.com/v1/shows/show123',
        id: 'show123',
        images: [],
        is_externally_hosted: false,
        languages: ['en'],
        media_type: 'audio',
        name: 'Test Show',
        publisher: 'Test Publisher',
        type: 'show',
        uri: 'spotify:show:show123',
        total_episodes: 10,
        episodes: {
          href: 'https://api.spotify.com/v1/shows/show123/episodes',
          items: [],
          limit: 50,
          next: null,
          offset: 0,
          previous: null,
          total: 10,
        },
      };
      (show['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await show.getShow(mockId, mockParams);

      expect(show['get']).toHaveBeenCalledWith(`/shows/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralShows', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['show123', 'show456'];
      const mockParams: GetShowParams = { market: 'US' };
      const mockResponse: SimplifiedShow[] = [
        {
          available_markets: ['US'],
          copyrights: [],
          description: 'Test show 1',
          html_description: '<p>Test show 1</p>',
          explicit: false,
          external_urls: { spotify: 'https://open.spotify.com/show/show123' },
          href: 'https://api.spotify.com/v1/shows/show123',
          id: 'show123',
          images: [],
          is_externally_hosted: false,
          languages: ['en'],
          media_type: 'audio',
          name: 'Test Show 1',
          publisher: 'Test Publisher',
          type: 'show',
          uri: 'spotify:show:show123',
          total_episodes: 10,
        },
        {
          available_markets: ['US'],
          copyrights: [],
          description: 'Test show 2',
          html_description: '<p>Test show 2</p>',
          explicit: false,
          external_urls: { spotify: 'https://open.spotify.com/show/show456' },
          href: 'https://api.spotify.com/v1/shows/show456',
          id: 'show456',
          images: [],
          is_externally_hosted: false,
          languages: ['en'],
          media_type: 'audio',
          name: 'Test Show 2',
          publisher: 'Test Publisher',
          type: 'show',
          uri: 'spotify:show:show456',
          total_episodes: 5,
        },
      ];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('show123,show456');
      (show['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await show.getSeveralShows(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(show['get']).toHaveBeenCalledWith('/shows', { ids: 'show123,show456', ...mockParams });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getShowsEpisodes', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'show123';
      const mockParams: GetShowEpisodesOptionalParams = { market: 'US', limit: 10, offset: 0 };
      const mockResponse: ShowEpisodes = {
        href: 'https://api.spotify.com/v1/shows/show123/episodes?offset=0&limit=10',
        items: [],
        limit: 10,
        next: null,
        offset: 0,
        previous: null,
        total: 50,
      };
      (show['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await show.getShowsEpisodes(mockId, mockParams);

      expect(show['get']).toHaveBeenCalledWith(`/shows/${mockId}/episodes`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUsersSavedShows', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetUsersSavedShowsOptionalParams = { limit: 20, offset: 0 };
      const mockResponse: UserSavedShows = {
        href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 3,
      };
      (show['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await show.getUsersSavedShows(mockParams);

      expect(show['get']).toHaveBeenCalledWith('/me/shows', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveShowsForCurrentUser', () => {
    it('should call put method with correct params', async () => {
      const mockIds = ['show123', 'show456'];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('show123,show456');
      (generateQueryParametersString as jest.Mock).mockReturnValue('?ids=show123,show456');

      await show.saveShowsForCurrentUser(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(generateQueryParametersString).toHaveBeenCalledWith({ ids: 'show123,show456' });
      expect(show['put']).toHaveBeenCalledWith('/me/shows?ids=show123,show456');
    });
  });

  describe('removeUserSavedShows', () => {
    it('should call delete method with correct params', async () => {
      const mockIds = ['show123', 'show456'];
      const mockParams: RemoveUsersShowsOptionalParams = { market: 'US' };
      (joinIdsArrayToString as jest.Mock).mockReturnValue('show123,show456');
      (generateQueryParametersString as jest.Mock).mockReturnValue('?ids=show123,show456&market=US');

      await show.removeUserSavedShows(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(generateQueryParametersString).toHaveBeenCalledWith({ ids: 'show123,show456', ...mockParams });
      expect(show['delete']).toHaveBeenCalledWith('/me/shows?ids=show123,show456&market=US');
    });
  });

  describe('checkUserSavedShows', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['show123', 'show456'];
      const mockResponse = [true, false];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('show123,show456');
      (show['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await show.checkUserSavedShows(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(show['get']).toHaveBeenCalledWith('/me/shows/contains', { ids: 'show123,show456' });
      expect(result).toEqual(mockResponse);
    });
  });
});
