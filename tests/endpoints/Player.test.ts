import { Player } from '../../src/endpoints/Player';
import { generateQueryParametersString } from '../../src/utils';
import {
  PlaybackState,
  Devices,
  CurrentlyPlayingTrack,
  UserTrackEpisodeQueue,
} from '../../src/types';

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
      const mockResponse: PlaybackState = { /* mock PlaybackState data */ } as any;
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getPlaybackState(mockParams);

      expect(player['get']).toHaveBeenCalledWith('/me/player', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('transferPlayback', () => {
    it('should call put method with correct params', async () => {
      const mockDeviceIds = ['device1', 'device2'];
      const mockOptionalParams = { play: true };

      await player.transferPlayback(mockDeviceIds, mockOptionalParams);

      expect(player['put']).toHaveBeenCalledWith('/me/player', { device_ids: mockDeviceIds, ...mockOptionalParams });
    });
  });

  describe('getAvailableDevices', () => {
    it('should call get method and return expected result', async () => {
      const mockResponse: Devices = { devices: [] };
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getAvailableDevices();

      expect(player['get']).toHaveBeenCalledWith('/me/player/devices');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCurrentlyPlayingTrack', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { market: 'US' };
      const mockResponse: CurrentlyPlayingTrack = { /* mock CurrentlyPlayingTrack data */ } as any;
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getCurrentlyPlayingTrack(mockParams);

      expect(player['get']).toHaveBeenCalledWith('/me/player/currently-playing', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('startResumePlayback', () => {
    it('should call put method with correct params', async () => {
      const mockParams = { device_id: 'device1', context_uri: 'spotify:album:123' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');

      await player.startResumePlayback(mockParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ device_id: mockParams.device_id });
      expect(player['put']).toHaveBeenCalledWith('/me/player/play?device_id=device1', mockParams);
    });
  });

  describe('pausePlayback', () => {
    it('should call put method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');

      await player.pausePlayback(mockDeviceId);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ device_id: mockDeviceId });
      expect(player['put']).toHaveBeenCalledWith('/me/player/pause?device_id=device1');
    });
  });

  describe('skipToNext', () => {
    it('should call post method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');

      await player.skipToNext(mockDeviceId);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ device_id: mockDeviceId });
      expect(player['post']).toHaveBeenCalledWith('/me/player/next?device_id=device1');
    });
  });

  describe('skipToPrevious', () => {
    it('should call post method with correct params', async () => {
      const mockDeviceId = 'device1';
      (generateQueryParametersString as jest.Mock).mockReturnValue('?device_id=device1');

      await player.skipToPrevious(mockDeviceId);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ device_id: mockDeviceId });
      expect(player['post']).toHaveBeenCalledWith('/me/player/previous?device_id=device1');
    });
  });

  describe('seekToPosition', () => {
    it('should call put method with correct params', async () => {
      const mockPositionMs = 30000;
      const mockOptionalParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?position_ms=30000&device_id=device1');

      await player.seekToPosition(mockPositionMs, mockOptionalParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ position_ms: mockPositionMs, ...mockOptionalParams });
      expect(player['put']).toHaveBeenCalledWith('/me/player/seek?position_ms=30000&device_id=device1');
    });
  });

  describe('setRepeatMode', () => {
    it('should call put method with correct params', async () => {
      const mockState = 'track';
      const mockOptionalParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?state=track&device_id=device1');

      await player.setRepeatMode(mockState, mockOptionalParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ state: mockState, ...mockOptionalParams });
      expect(player['put']).toHaveBeenCalledWith('/me/player/repeat?state=track&device_id=device1');
    });
  });

  describe('setPlaybackVolume', () => {
    it('should call put method with correct params', async () => {
      const mockVolume = 50;
      const mockOptionalParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?volume_percent=50&device_id=device1');

      await player.setPlaybackVolume(mockVolume, mockOptionalParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ volume_percent: mockVolume, ...mockOptionalParams });
      expect(player['put']).toHaveBeenCalledWith('/me/player/repeat?volume_percent=50&device_id=device1');
    });
  });

  describe('togglePlaybackShuffle', () => {
    it('should call put method with correct params', async () => {
      const mockState = true;
      const mockOptionalParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?state=true&device_id=device1');

      await player.togglePlaybackShuffle(mockState, mockOptionalParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ state: mockState, ...mockOptionalParams });
      expect(player['put']).toHaveBeenCalledWith('/me/player/shuffle?state=true&device_id=device1');
    });
  });

  describe('getTheUserQueue', () => {
    it('should call get method and return expected result', async () => {
      const mockResponse: UserTrackEpisodeQueue = { /* mock UserTrackEpisodeQueue data */ } as any;
      (player['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await player.getTheUserQueue();

      expect(player['get']).toHaveBeenCalledWith('/me/player/queue');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addItemToPlaybackQueue', () => {
    it('should call post method with correct params', async () => {
      const mockUri = 'spotify:track:123';
      const mockOptionalParams = { device_id: 'device1' };
      (generateQueryParametersString as jest.Mock).mockReturnValue('?uri=spotify%3Atrack%3A123&device_id=device1');

      await player.addItemToPlaybackQueue(mockUri, mockOptionalParams);

      expect(generateQueryParametersString).toHaveBeenCalledWith({ uri: encodeURI(mockUri), ...mockOptionalParams });
      expect(player['post']).toHaveBeenCalledWith('/me/player/queue?uri=spotify%3Atrack%3A123&device_id=device1}');
    });
  });
});