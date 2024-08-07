# Player Class

This class provides methods to interact with the Spotify Web API and control playback on the user's account.

## Methods

### getPlaybackState(optionalParams?: GetPlaybackStateParams)

This method is used to get information about the user's current playback state, including track or episode, progress, and active device.

#### Endpoint: [/me/player](https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback)

#### Parameters:

- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".
  - `additional_types`: A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.

#### Returns: `PlaybackState`

The `PlaybackState` object contains information about the user's current playback state, including:
- `device`: Information about the device that is currently active
- `repeat_state`: The repeat state of the player
- `shuffle_state`: The shuffle state of the player
- `context`: The context of the current playback
- `timestamp`: A Unix timestamp in milliseconds
- `progress_ms`: Progress into the currently playing track or episode
- `is_playing`: Whether or not the user is currently playing content
- `item`: The currently playing track or episode
- `currently_playing_type`: The type of the currently playing item
- `actions`: Actions that are permitted in the current context

#### Example

```typescript
const playbackState = await spotified.player.getPlaybackState({ market: 'US' });
console.log(`Currently playing: ${playbackState.item?.name}`);
console.log(`Is playing: ${playbackState.is_playing}`);
```

### transferPlayback(deviceIds: string[], optionalParams: TransferPlaybackOptionalParams)

This method is used to transfer playback to a new device and determine if it should start playing.

#### Endpoint: [/me/player](https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback)

#### Parameters:

- `deviceIds` (required): An array containing the ID of the device on which playback should be started/transferred.
- `optionalParams` (required): An object containing optional parameters:
  - `play`: Whether to ensure playback happens on the new device. Otherwise, keep the current playback state.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.transferPlayback(['deviceId123'], { play: true });
console.log('Playback transferred successfully');
```

### getAvailableDevices()

This method is used to get information about a user's available devices.

#### Endpoint: [/me/player/devices](https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices)

#### Returns: `Devices`

The `Devices` object contains an array of `Device` objects, each with the following properties:
- `id`: The device ID
- `is_active`: If this device is the currently active device
- `is_private_session`: If this device is currently in a private session
- `is_restricted`: Whether controlling this device is restricted
- `name`: The name of the device
- `type`: The type of device
- `volume_percent`: The current volume as a percentage

#### Example

```typescript
const devices = await spotified.player.getAvailableDevices();
devices.devices.forEach(device => {
    console.log(`Device: ${device.name}, Type: ${device.type}, Active: ${device.is_active}`);
});
```

### getCurrentlyPlayingTrack(optionalParams?: CurrentlyPlayingTrackParams)

This method is used to get the object currently being played on the user's Spotify account.

#### Endpoint: [/me/player/currently-playing](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track)

#### Parameters:

- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".
  - `additional_types`: A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.

#### Returns: `CurrentlyPlayingTrack`

The `CurrentlyPlayingTrack` object is the same as the `PlaybackState` object (see `getPlaybackState` return type).

#### Example

```typescript
const currentTrack = await spotified.player.getCurrentlyPlayingTrack({ market: 'US' });
console.log(`Now playing: ${currentTrack.item?.name} by ${currentTrack.item?.artists?.[0].name}`);
```

### startResumePlayback(deviceId: string, params: ResumePlaybackParams)

This method is used to start a new context or resume current playback on the user's active device.

#### Endpoint: [/me/player/play](https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback)

#### Parameters:

- `deviceId` (required): The ID of the device this command is targeting.
- `params` (required): An object containing playback options:
  - `context_uri`: Spotify URI of the context to play (album, artist, playlist)
  - `uris`: An array of Spotify track URIs to play
  - `offset`: Indicates from where in the context playback should start
  - `position_ms`: The position in milliseconds to seek to

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.startResumePlayback('deviceId123', {
    context_uri: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'
});
console.log('Playback started/resumed');
```

### pausePlayback(deviceId?: string)

This method is used to pause playback on the user's account.

#### Endpoint: [/me/player/pause](https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback)

#### Parameters:

- `deviceId` (optional): The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.pausePlayback();
console.log('Playback paused');
```

### skipToNext(deviceId?: string)

This method is used to skip to the next track in the user's queue.

#### Endpoint: [/me/player/next](https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track)

#### Parameters:

- `deviceId` (optional): The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.skipToNext();
console.log('Skipped to next track');
```

### skipToPrevious(deviceId?: string)

This method is used to skip to the previous track in the user's queue.

#### Endpoint: [/me/player/previous](https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track)

#### Parameters:

- `deviceId` (optional): The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.skipToPrevious();
console.log('Skipped to previous track');
```

### seekToPosition(positionMS: number, optionalParams?: SeekToPositionOptionalParam)

This method is used to seek to the given position in the user's currently playing track.

#### Endpoint: [/me/player/seek](https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track)

#### Parameters:

- `positionMS` (required): The position in milliseconds to seek to.
- `optionalParams` (optional): An object containing optional parameters:
  - `device_id`: The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.seekToPosition(30000);
console.log('Seeked to 30 seconds');
```

### setRepeatMode(state: RepeatState, optionalParams?: SetRepeatModeOptionalParams)

This method is used to set the repeat mode for the user's playback.

#### Endpoint: [/me/player/repeat](https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback)

#### Parameters:

- `state` (required): The repeat mode. Can be one of `track`, `context`, or `off`.
- `optionalParams` (optional): An object containing optional parameters:
  - `device_id`: The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.setRepeatMode('track');
console.log('Repeat mode set to track');
```

### setPlaybackVolume(volume: number, optionalParams?: SetPlaybackVolumeOptionalParams)

This method is used to set the volume for the user's current playback device.

#### Endpoint: [/me/player/volume](https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback)

#### Parameters:

- `volume` (required): The volume to set. Must be a value from 0 to 100 inclusive.
- `optionalParams` (optional): An object containing optional parameters:
  - `device_id`: The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.setPlaybackVolume(50);
console.log('Volume set to 50%');
```

### togglePlaybackShuffle(state: boolean, optionalParams: TogglePlaybackShuffleOptionalParams)

This method is used to toggle shuffle on or off for user's playback.

#### Endpoint: [/me/player/shuffle](https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback)

#### Parameters:

- `state` (required): Whether to shuffle the user's playback or not.
- `optionalParams` (required): An object containing optional parameters:
  - `device_id`: The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.togglePlaybackShuffle(true, {});
console.log('Shuffle turned on');
```

### getRecentlyPlayedTracks(optionalParams: GetRecentlyPlayedTracksOptionalParams)

This method is used to get tracks from the current user's recently played tracks.

#### Endpoint: [/me/player/recently-played](https://developer.spotify.com/documentation/web-api/reference/get-recently-played)

#### Parameters:

- `optionalParams` (required): An object containing optional parameters:
  - `limit`: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  - `after`: A Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position.
  - `before`: A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position.

#### Returns: `RecentlyPlayedTracks`

The `RecentlyPlayedTracks` object contains:
- `href`: A link to the Web API endpoint providing full details of the track.
- `limit`: The maximum number of items in the response (as set in the query or by default).
- `next`: URL to the next page of items. (null if none)
- `cursors`: An object containing a `before` and `after` value used for pagination.
- `total`: The total number of items available to return.
- `items`: An array of `PlayHistoryObject` objects, each containing:
  - `track`: Information about the track.
  - `played_at`: The date and time the track was played.
  - `context`: The context the track was played from.

#### Example

```typescript
const recentTracks = await spotified.player.getRecentlyPlayedTracks({ limit: 5 });
recentTracks.items?.forEach(item => {
    console.log(`${item.track?.name} played at ${item.played_at}`);
});
```

### getTheUserQueue()

This method is used to get the list of objects that make up the user's queue.

#### Endpoint: [/me/player/queue](https://developer.spotify.com/documentation/web-api/reference/get-queue)

#### Returns: `UserTrackEpisodeQueue`

The `UserTrackEpisodeQueue` object contains:
- `currently_playing`: The currently playing track or episode.
- `queue`: An array of tracks or episodes in the queue.

#### Example

```typescript
const queue = await spotified.player.getTheUserQueue();
console.log(`Currently playing: ${queue.currently_playing?.name}`);
queue.queue.forEach((item, index) => {
    console.log(`Queue item ${index + 1}: ${item.name}`);
});
```

### addItemToPlaybackQueue(uri: string, optionalParams: AddItemToPlaybackQueueOptionalParams)

This method is used to add an item to the end of the user's current playback queue.

#### Endpoint: [/me/player/queue](https://developer.spotify.com/documentation/web-api/reference/add-to-queue)

#### Parameters:

- `uri` (required): The uri of the item to add to the queue. Must be a track or an episode uri.
- `optionalParams` (required): An object containing optional parameters:
  - `device_id`: The ID of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.player.addItemToPlaybackQueue('spotify:track:4iV5W9uYEdYUVa79Axb7Rh', {});
console.log('Item added to queue');
```