import { Album } from '../../src/endpoints/Album';
import { joinIdsArrayToString } from '../../src/utils';
import {
  Album as AlbumDetail,
  AlbumTracks,
  GetAlbumOptionalParams,
  GetUserSavedAlbumsOptionalParams,
  GetAlbumTracksOptionalParams,
  PagedAlbums,
  UserSavedAlbum,
  GetNewReleasesOptionalParams,
} from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Album', () => {
  let album: Album;

  beforeEach(() => {
    album = new Album({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAlbum', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'album123';
      const mockParams: GetAlbumOptionalParams = { market: 'US' };
      const mockResponse: AlbumDetail = {
        id: 'album123',
        name: 'Test Album',
        type: 'album',
        artists: [],
        tracks: {
          items: [],
          total: 0,
          limit: 20,
          offset: 0,
          next: null,
          previous: null,
          href: 'https://api.spotify.com/v1/albums/album123/tracks',
        },
        uri: 'spotify:album:album123',
        href: 'https://api.spotify.com/v1/albums/album123',
        images: [],
        available_markets: [],
        album_type: 'album',
        external_urls: {
          spotify: 'https://open.spotify.com/album/album123',
        },
        release_date: '2021-01-01',
        release_date_precision: 'day',
        total_tracks: 0,
        copyrights: [],
        external_ids: {},
        genres: [],
        label: '',
        popularity: 0,
      };
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.getAlbum(mockId, mockParams);

      expect(album['get']).toHaveBeenCalledWith(`/albums/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralAlbums', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['album123', 'album456'];
      const mockParams: GetAlbumOptionalParams = { market: 'US' };
      const mockResponse: AlbumDetail[] = [
        { id: 'album123', name: 'Test Album 1', type: 'album' } as AlbumDetail,
        { id: 'album456', name: 'Test Album 2', type: 'album' } as AlbumDetail,
      ];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('album123,album456');
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.getSeveralAlbums(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(album['get']).toHaveBeenCalledWith('/albums', { ids: 'album123,album456', ...mockParams });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAlbumTracks', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'album123';
      const mockParams: GetAlbumTracksOptionalParams = { limit: 20, offset: 0, market: 'US' };
      const mockResponse: AlbumTracks = {
        href: 'https://api.spotify.com/v1/albums/album123/tracks',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 10,
      };
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.getAlbumTracks(mockId, mockParams);

      expect(album['get']).toHaveBeenCalledWith(`/albums/${mockId}/tracks`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserSavedAlbum', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetUserSavedAlbumsOptionalParams = { limit: 20, offset: 0, market: 'US' };
      const mockResponse: UserSavedAlbum = {
        href: 'https://api.spotify.com/v1/me/albums',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 3,
      };
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.getUserSavedAlbum(mockParams);

      expect(album['get']).toHaveBeenCalledWith('/me/albums', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAlbumsforCurrentUser', () => {
    it('should call put method with correct params', async () => {
      const mockIds = ['album123', 'album456'];

      await album.saveAlbumsforCurrentUser(mockIds);

      expect(album['put']).toHaveBeenCalledWith('/me/albums', { ids: mockIds });
    });
  });

  describe('removeUserSavedAlbum', () => {
    it('should call delete method with correct params', async () => {
      const mockIds = ['album123', 'album456'];

      await album.removeUserSavedAlbum(mockIds);

      expect(album['delete']).toHaveBeenCalledWith('/me/albums', { ids: mockIds });
    });
  });

  describe('checkUserSavedAlbums', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['album123', 'album456'];
      const mockResponse = [true, false];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('album123,album456');
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.checkUserSavedAlbums(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(album['get']).toHaveBeenCalledWith('/me/albums/contains', { ids: 'album123,album456' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNewReleases', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetNewReleasesOptionalParams = { limit: 20, offset: 0 };
      const mockResponse: PagedAlbums = {
        href: 'https://api.spotify.com/v1/browse/new-releases',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 100,
      };
      (album['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await album.getNewReleases(mockParams);

      expect(album['get']).toHaveBeenCalledWith('/broese/new-releases', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });
});
