import { Playlist } from '../../src/endpoints/Playlist';
import {
  Playlist as PlaylistDetail,
  PlaylistItems,
  UserPlaylist,
  FeaturedPlaylist,
  CategoryPlaylist,
  Image,
  GetPlaylistOptionalParams,
  ChangePlaylistDetailsOptionalParams,
  GetPlaylistItemsOptionalParams,
  UpdatePlaylistItemsOptionalParams,
  AddItemsToPlaylistOptionalParams,
  RemovePlaylistItemsParams,
  GetUserSavedPlaylistsOptionalParams,
  GetCategoryPlaylistOptionalParams,
  GetFeaturedPlaylistOptionalParams,
} from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Playlist', () => {
  let playlist: Playlist;

  beforeEach(() => {
    playlist = new Playlist({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getPlaylist', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'playlist123';
      const mockParams: GetPlaylistOptionalParams = {
        market: 'US',
        fields: 'id,name,tracks.items(track(name,href,album(name,href)))',
      };
      const mockResponse: PlaylistDetail = {
        id: 'playlist123',
        name: 'Test Playlist',
        tracks: {
          items: [],
          total: 0,
          limit: 100,
          offset: 0,
          href: 'https://api.spotify.com/v1/playlists/playlist123/tracks',
          next: null,
          previous: null,
        },
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getPlaylist(mockId, mockParams);

      expect(playlist['get']).toHaveBeenCalledWith(`/playlists/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('changePlaylistDetails', () => {
    it('should call put method with correct params', async () => {
      const mockId = 'playlist123';
      const mockParams: ChangePlaylistDetailsOptionalParams = { name: 'New Playlist Name', public: true };

      await playlist.changePlaylistDetails(mockId, mockParams);

      expect(playlist['put']).toHaveBeenCalledWith(`/playlists/${mockId}`, mockParams);
    });
  });

  describe('getPlaylistItems', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'playlist123';
      const mockParams: GetPlaylistItemsOptionalParams = {
        market: 'US',
        fields: 'items(track(name,href))',
        limit: 20,
        offset: 0,
      };
      const mockResponse: PlaylistItems = {
        href: 'https://api.spotify.com/v1/playlists/playlist123/tracks',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getPlaylistItems(mockId, mockParams);

      expect(playlist['get']).toHaveBeenCalledWith(`/playlists/${mockId}/tracks`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updatePlaylistItems', () => {
    it('should call put method with correct params and return expected result', async () => {
      const mockId = 'playlist123';
      const mockParams: UpdatePlaylistItemsOptionalParams = {
        uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh', 'spotify:track:1301WleyT98MSxVHPZCA6M'],
        range_start: 0,
        insert_before: 3,
        range_length: 2,
        snapshot_id: 'MyOldSnapshotId',
      };
      const mockResponse = { snapshot_id: 'MyNewSnapshotId' };
      (playlist['put'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.updatePlaylistItems(mockId, mockParams);

      expect(playlist['put']).toHaveBeenCalledWith(`/playlists/${mockId}/tracks`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addItemsToPlaylist', () => {
    it('should call post method with correct params and return expected result', async () => {
      const mockId = 'playlist123';
      const mockParams: AddItemsToPlaylistOptionalParams = {
        uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh', 'spotify:track:1301WleyT98MSxVHPZCA6M'],
        position: 0,
      };
      const mockResponse = { snapshot_id: 'MyNewSnapshotId' };
      (playlist['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.addItemsToPlaylist(mockId, mockParams);

      expect(playlist['post']).toHaveBeenCalledWith(`/playlists/${mockId}/tracks`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('removePlaylistItems', () => {
    it('should call delete method with correct params and return expected result', async () => {
      const mockId = 'playlist123';
      const mockParams: RemovePlaylistItemsParams = {
        tracks: [{ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' }, { uri: 'spotify:track:1301WleyT98MSxVHPZCA6M' }],
        snapshot_id: 'MyOldSnapshotId',
      };
      const mockResponse = { snapshot_id: 'MyNewSnapshotId' };
      (playlist['delete'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.removePlaylistItems(mockId, mockParams);

      expect(playlist['delete']).toHaveBeenCalledWith(`/playlists/${mockId}/tracks`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCurrentUserPlaylists', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetUserSavedPlaylistsOptionalParams = { limit: 20, offset: 0 };
      const mockResponse: UserPlaylist = {
        href: 'https://api.spotify.com/v1/me/playlists',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getCurrentUserPlaylists(mockParams);

      expect(playlist['get']).toHaveBeenCalledWith('/me/playlists', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserPlaylists', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockUserId = 'user123';
      const mockParams: GetUserSavedPlaylistsOptionalParams = { limit: 20, offset: 0 };
      const mockResponse: UserPlaylist = {
        href: 'https://api.spotify.com/v1/users/user123/playlists',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getUserPlaylists(mockUserId, mockParams);

      expect(playlist['get']).toHaveBeenCalledWith(`/users/${mockUserId}/playlists`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createPlaylist', () => {
    it('should call post method with correct params and return expected result', async () => {
      const mockUserId = 'user123';
      const mockPlaylistName = 'My New Playlist';
      const mockParams = { public: false, description: 'My new playlist description' };
      const mockResponse: PlaylistDetail = {
        id: 'newplaylist123',
        name: 'My New Playlist',
        public: false,
        description: 'My new playlist description',
      } as PlaylistDetail;
      (playlist['post'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.createPlaylist(mockUserId, mockPlaylistName, mockParams);

      expect(playlist['post']).toHaveBeenCalledWith(`/users/${mockUserId}/playlists`, {
        name: mockPlaylistName,
        ...mockParams,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFeaturedPlaylist', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetFeaturedPlaylistOptionalParams = { locale: 'en_US', limit: 20, offset: 0 };
      const mockResponse: FeaturedPlaylist = {
        message: "Editor's picks",
        playlists: {
          href: 'https://api.spotify.com/v1/browse/featured-playlists',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getFeaturedPlaylist(mockParams);

      expect(playlist['get']).toHaveBeenCalledWith('/browse/featured-playlists', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCategoryPlaylist', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockCategoryId = 'party';
      const mockParams: GetCategoryPlaylistOptionalParams = { limit: 20, offset: 0 };
      const mockResponse: CategoryPlaylist = {
        playlists: {
          href: 'https://api.spotify.com/v1/browse/categories/party/playlists',
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 0,
        },
      };
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getCategoryPlaylist(mockCategoryId, mockParams);

      expect(playlist['get']).toHaveBeenCalledWith(`/browse/categories/${mockCategoryId}/playlists`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPlaylistCoverImage', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockPlaylistId = 'playlist123';
      const mockResponse: Image[] = [
        { url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228', height: 300, width: 300 },
      ];
      (playlist['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await playlist.getPlaylistCoverImage(mockPlaylistId);

      expect(playlist['get']).toHaveBeenCalledWith(`/playlists/${mockPlaylistId}/images`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addCustomPlaylistCoverImage', () => {
    it('should call put method with correct params', async () => {
      const mockPlaylistId = 'playlist123';
      const mockImage = 'base64EncodedJpegData';

      await playlist.addCustomPlaylistCoverImage(mockPlaylistId, mockImage);

      expect(playlist['put']).toHaveBeenCalledWith(`/playlists/${mockPlaylistId}/images`, mockImage, {
        headers: { 'Content-Type': 'image/jpeg' },
      });
    });
  });
});
