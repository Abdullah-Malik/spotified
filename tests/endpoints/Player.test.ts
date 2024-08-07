import { Player } from '../../src/endpoints/Player';
import { generateQueryParametersString } from '../../src/utils';
import { PlaybackState, CurrentlyPlayingTrack, RecentlyPlayedTracks, UserTrackEpisodeQueue } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');
jest.mock('../../src/utils');

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getPlaybackState', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { market: 'US' };
      const mockResponse: Partial<PlaybackState> = { is_playing: true };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getPlaybackState(mockParams);

      expect(player['get']).toHaveBeenCalledWith('/me/player', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('transferPlayback', () => {
    it('should call put method with correct params', async () => {
      const mockDeviceIds = ['device1', 'device2'];
      const mockParams = { play: true };
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.transferPlayback(mockDeviceIds, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player', { device_ids: mockDeviceIds, ...mockParams });
    });
  });

  describe('getAvailableDevices', () => {
    it('should call get method and return expected result', async () => {
      const mockResponse = { devices: [{ id: 'device1', is_active: true, name: 'Device 1' }] };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getAvailableDevices();

      expect(player['get']).toHaveBeenCalledWith('/me/player/devices');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCurrentlyPlayingTrack', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { market: 'US' };
      const mockResponse: Partial<CurrentlyPlayingTrack> = { is_playing: true };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getCurrentlyPlayingTrack(mockParams);

      expect(player['get']).toHaveBeenCalledWith('/me/player/currently-playing', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('startResumePlayback', () => {
    it('should call put method with correct params', async () => {
      const mockDeviceId = 'device1';
      const mockParams = { context_uri: 'spotify:album:1234' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.startResumePlayback(mockDeviceId, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player/play?device_id=device1', mockParams);
    });
  });

  describe('pausePlayback', () => {
    it('should call put method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.pausePlayback(mockDeviceId);

      expect(player['put']).toHaveBeenCalledWith('/me/player/pause?device_id=device1');
    });
  });

  describe('skipToNext', () => {
    it('should call post method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');
      (player['post'] as jest.Mock).mockResolvedValue({});

      await player.skipToNext(mockDeviceId);

      expect(player['post']).toHaveBeenCalledWith('/me/player/next?device_id=device1');
    });
  });

  describe('skipToPrevious', () => {
    it('should call post method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');
      (player['post'] as jest.Mock).mockResolvedValue({});

      await player.skipToPrevious(mockDeviceId);

      expect(player['post']).toHaveBeenCalledWith('/me/player/previous?device_id=device1');
    });
  });

  describe('seekToPosition', () => {
    it('should call put method with correct params', async () => {
      const mockPositionMs = 30000;
      const mockParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?position_ms=30000&device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.seekToPosition(mockPositionMs, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player/seek?position_ms=30000&device_id=device1');
    });
  });

  describe('setRepeatMode', () => {
    it('should call put method with correct params', async () => {
      const mockState = 'track';
      const mockParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?state=track&device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.setRepeatMode(mockState, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player/repeat?state=track&device_id=device1');
    });
  });

  describe('setPlaybackVolume', () => {
    it('should call put method with correct params', async () => {
      const mockVolume = 50;
      const mockParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?volume_percent=50&device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.setPlaybackVolume(mockVolume, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player/volume?volume_percent=50&device_id=device1');
    });
  });

  describe('togglePlaybackShuffle', () => {
    it('should call put method with correct params', async () => {
      const mockState = true;
      const mockParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?state=true&device_id=device1');
      (player['put'] as jest.Mock).mockResolvedValue({});

      await player.togglePlaybackShuffle(mockState, mockParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player/shuffle?state=true&device_id=device1');
    });
  });

  describe('getRecentlyPlayedTracks', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { limit: 10 };
      const mockResponse: Partial<RecentlyPlayedTracks> = { items: [] };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getRecentlyPlayedTracks(mockParams);

      expect(player['get']).toHaveBeenCalledWith('/me/player/recently-played', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTheUserQueue', () => {
    it('should call get method and return expected result', async () => {
      const mockResponse: Partial<UserTrackEpisodeQueue> = { queue: [] };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getTheUserQueue();

      expect(player['get']).toHaveBeenCalledWith('/me/player/queue');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addItemToPlaybackQueue', () => {
    it('should call post method with correct params', async () => {
      const mockUri = 'spotify:track:1234';
      const mockParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?uri=spotify%3Atrack%3A1234&device_id=device1');
      (player['post'] as jest.Mock).mockResolvedValue({});

      await player.addItemToPlaybackQueue(mockUri, mockParams);

      expect(player['post']).toHaveBeenCalledWith('/me/player/queue?uri=spotify%3Atrack%3A1234&device_id=device1}');
    });
  });
});
