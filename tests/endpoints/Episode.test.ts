import { Episode } from '../../src/endpoints/Episode';
import { joinIdsArrayToString } from '../../src/utils';
import { GetEpisodeParams, GetSavedEpisodeParams, Episode as EpisodeDetail, UserSavedEpisodes } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Episode', () => {
  let episode: Episode;

  beforeEach(() => {
    episode = new Episode({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getEpisode', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = 'episode123';
      const mockParams: GetEpisodeParams = { market: 'US' };
      const mockResponse: EpisodeDetail = {
        audio_preview_url: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
        description: 'Test episode description',
        html_description: '<p>Test episode description</p>',
        duration_ms: 1800000,
        explicit: false,
        external_urls: { spotify: 'https://open.spotify.com/episode/episode123' },
        href: 'https://api.spotify.com/v1/episodes/episode123',
        id: 'episode123',
        images: [],
        is_externally_hosted: false,
        is_playable: true,
        languages: ['en'],
        name: 'Test Episode',
        release_date: '2023-01-01',
        release_date_precision: 'day',
        type: 'episode',
        uri: 'spotify:episode:episode123',
        show: { type: 'show', href: 'https://api.spotify.com/v1/shows/show123' } as any,
      };
      (episode['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await episode.getEpisode(mockId, mockParams);

      expect(episode['get']).toHaveBeenCalledWith(`/episodes/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralEpisodes', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['episode123', 'episode456'];
      const mockParams: GetEpisodeParams = { market: 'US' };
      const mockResponse: EpisodeDetail[] = [
        {
          id: 'episode123',
          name: 'Test Episode 1',
          type: 'episode',
        } as EpisodeDetail,
        {
          id: 'episode456',
          name: 'Test Episode 2',
          type: 'episode',
        } as EpisodeDetail,
      ];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('episode123,episode456');
      (episode['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await episode.getSeveralEpisodes(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(episode['get']).toHaveBeenCalledWith('/episodes', { ids: 'episode123,episode456', ...mockParams });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserSavedEpisodes', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams: GetSavedEpisodeParams = { limit: 20, offset: 0, market: 'US' };
      const mockResponse: UserSavedEpisodes = {
        href: 'https://api.spotify.com/v1/me/episodes?offset=0&limit=20',
        items: [],
        limit: 20,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
      };
      (episode['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await episode.getUserSavedEpisodes(mockParams);

      expect(episode['get']).toHaveBeenCalledWith('/me/episodes', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveEpisodesForCurrentUser', () => {
    it('should call put method with correct params', async () => {
      const mockIds = ['episode123', 'episode456'];

      await episode.saveEpisodesForCurrentUser(mockIds);

      expect(episode['put']).toHaveBeenCalledWith('/me/episodes', { ids: mockIds });
    });
  });

  describe('removeUserSavedEpisodes', () => {
    it('should call delete method with correct params', async () => {
      const mockIds = ['episode123', 'episode456'];

      await episode.removeUserSavedEpisodes(mockIds);

      expect(episode['delete']).toHaveBeenCalledWith('/me/episodes', { ids: mockIds });
    });
  });

  describe('checkUserSavedEpisodes', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['episode123', 'episode456'];
      const mockResponse = [true, false];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('episode123,episode456');
      (episode['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await episode.checkUserSavedEpisodes(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(episode['get']).toHaveBeenCalledWith('/me/episodes/contains', { ids: 'episode123,episode456' });
      expect(result).toEqual(mockResponse);
    });
  });
});
