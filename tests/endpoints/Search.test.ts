import { Search } from '../../src/endpoints/Search';
import { joinIdsArrayToString } from '../../src/utils';
import { SearchResponse, SearchOptionalParams } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Search', () => {
  let search: Search;

  beforeEach(() => {
    search = new Search({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('searchForItem', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockQuery = 'test query';
      const mockTypes = ['track', 'album'];
      const mockParams: SearchOptionalParams = {
        market: 'US',
        limit: 20,
        offset: 0,
        include_external: 'audio',
      };
      const mockResponse: SearchResponse = {
        tracks: {
          href: 'https://api.spotify.com/v1/search?query=test+query&type=track&market=US&offset=0&limit=20',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
        albums: {
          href: 'https://api.spotify.com/v1/search?query=test+query&type=album&market=US&offset=0&limit=20',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
      };

      (joinIdsArrayToString as jest.Mock).mockReturnValue('track,album');
      (search['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await search.searchForItem(mockQuery, mockTypes, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockTypes);
      expect(search['get']).toHaveBeenCalledWith('/search', {
        q: encodeURIComponent(mockQuery),
        type: 'track,album',
        market: 'US',
        limit: 20,
        offset: 0,
        include_external: 'audio',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle search with minimal parameters', async () => {
      const mockQuery = 'minimal query';
      const mockTypes = ['artist'];
      const mockResponse: SearchResponse = {
        artists: {
          href: 'https://api.spotify.com/v1/search?query=minimal+query&type=artist&offset=0&limit=20',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
      };

      (joinIdsArrayToString as jest.Mock).mockReturnValue('artist');
      (search['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await search.searchForItem(mockQuery, mockTypes);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockTypes);
      expect(search['get']).toHaveBeenCalledWith('/search', {
        q: encodeURIComponent(mockQuery),
        type: 'artist',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle multiple search types', async () => {
      const mockQuery = 'multi type query';
      const mockTypes = ['track', 'album', 'artist', 'playlist'];
      const mockResponse: SearchResponse = {
        tracks: { items: [], total: 0, limit: 20, offset: 0, href: '', next: null, previous: null },
        albums: { items: [], total: 0, limit: 20, offset: 0, href: '', next: null, previous: null },
        artists: { items: [], total: 0, limit: 20, offset: 0, href: '', next: null, previous: null },
        playlists: { items: [], total: 0, limit: 20, offset: 0, href: '', next: null, previous: null },
      };

      (joinIdsArrayToString as jest.Mock).mockReturnValue('track,album,artist,playlist');
      (search['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await search.searchForItem(mockQuery, mockTypes);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockTypes);
      expect(search['get']).toHaveBeenCalledWith('/search', {
        q: encodeURIComponent(mockQuery),
        type: 'track,album,artist,playlist',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty search results', async () => {
      const mockQuery = 'no results query';
      const mockTypes = ['track'];
      const mockResponse: SearchResponse = {
        tracks: {
          href: 'https://api.spotify.com/v1/search?query=no+results+query&type=track&offset=0&limit=20',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
      };

      (joinIdsArrayToString as jest.Mock).mockReturnValue('track');
      (search['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await search.searchForItem(mockQuery, mockTypes);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockTypes);
      expect(search['get']).toHaveBeenCalledWith('/search', {
        q: encodeURIComponent(mockQuery),
        type: 'track',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
