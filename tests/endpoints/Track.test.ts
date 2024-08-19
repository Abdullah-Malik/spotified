import { Track } from '../../src/endpoints/Track';
import { joinIdsArrayToString } from '../../src/utils';
import { UserSavedTracks, AudioFeatures, AudioFeaturesArray, AudioAnalysis, Recommendations } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Track', () => {
  let track: Track;

  beforeEach(() => {
    track = new Track({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTrack', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = '1234';
      const mockParams = { market: 'US' };
      const mockResponse = {
        id: '1234',
        name: 'Track Name',
        artists: [],
        album: {} as any,
        duration_ms: 200000,
      };
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getTrack(mockId, mockParams);

      expect(track['get']).toHaveBeenCalledWith(`/tracks/${mockId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralTracks', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['1234', '5678'];
      const mockParams = { market: 'US' };
      const mockResponse = {
        tracks: [{ id: '1234' }, { id: '5678' }],
      };
      (joinIdsArrayToString as jest.Mock).mockReturnValue('1234,5678');
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getSeveralTracks(mockIds, mockParams);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(track['get']).toHaveBeenCalledWith('/tracks', { ids: '1234,5678', market: 'US' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUsersSavedTracks', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { limit: 10, offset: 0 };
      const mockResponse: UserSavedTracks = {
        href: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=10',
        items: [],
        limit: 10,
        next: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=10',
        offset: 0,
        previous: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=10',
        total: 0,
      };
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getUsersSavedTracks(mockParams);

      expect(track['get']).toHaveBeenCalledWith('/tracks', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveTracksforCurrentUser', () => {
    it('should call put method with correct params and return expected result', async () => {
      const mockIds = ['1234', '5678'];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('1234,5678');

      await track.saveTracksforCurrentUser(mockIds);

      expect(track['put']).toHaveBeenCalledWith('/me/tracks', { ids: mockIds });
    });
  });

  describe('removeUsersSavedTracks', () => {
    it('should call delete method with correct params and return expected result', async () => {
      const mockIds = ['1234', '5678'];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('1234,5678');

      await track.removeUsersSavedTracks(mockIds);

      expect(track['delete']).toHaveBeenCalledWith('/me/tracks', { ids: mockIds });
    });
  });

  describe('checkUsersSavedTracks', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['1234', '5678'];
      const mockResponse = [true, false];
      (joinIdsArrayToString as jest.Mock).mockReturnValue('1234,5678');
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.checkUsersSavedTracks(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(track['get']).toHaveBeenCalledWith('/me/tracks/contains', { ids: '1234,5678' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTracksAudioFeatures', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = '1234';
      const mockResponse: AudioFeatures = {
        id: '1234',
        acousticness: 0.5,
        danceability: 0.7,
        energy: 0.6,
      };
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getTracksAudioFeatures(mockId);

      expect(track['get']).toHaveBeenCalledWith(`/audio-features/${mockId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMultipleTracksAudioFeatures', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockIds = ['1234', '5678'];
      const mockResponse: AudioFeaturesArray = {
        audio_features: [{ id: '1234' }, { id: '5678' }],
      };
      (joinIdsArrayToString as jest.Mock).mockReturnValue('1234,5678');
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getMultipleTracksAudioFeatures(mockIds);

      expect(joinIdsArrayToString).toHaveBeenCalledWith(mockIds);
      expect(track['get']).toHaveBeenCalledWith('/audio-features', { ids: '1234,5678' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTracksAudioAnalysis', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockId = '1234';
      const mockResponse: AudioAnalysis = {
        bars: [],
        beats: [],
        sections: [],
        segments: [],
        tatums: [],
      };
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getTracksAudioAnalysis(mockId);

      expect(track['get']).toHaveBeenCalledWith(`audio-analysis/${mockId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRecommendations', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockSeedParams = {
        seed_artists: '1234',
        seed_genres: 'rock',
        seed_tracks: '5678',
      };
      const mockOptionalParams = {
        limit: 10,
        market: 'US',
      };
      const mockResponse: Recommendations = {
        seeds: [],
        tracks: [],
      };
      (track['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await track.getRecommendations(mockSeedParams, mockOptionalParams);

      expect(track['get']).toHaveBeenCalledWith('/recommendations', {
        ...mockSeedParams,
        ...mockOptionalParams,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
