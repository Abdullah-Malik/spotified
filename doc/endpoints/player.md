# Player Class

This class provides methods to interact with the Spotify Web API and retrieve information about the music player.

## Methods

### getPlaybackState(params?: GetPlaybackStateParams)

This method is used to get information about the user’s current playback state, including track or episode, progress, and active device.

#### Endpoint: [/me/player](https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback)

#### Parameters:

#### Return:

#### Example
```typescript

```

### transferPlayback(deviceIds: string[], optionalParams: TransferPlaybackOptionalParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### getAvailableDevices()

#### Parameters:

#### Return:

#### Example
```typescript

```

### getCurrentlyPlayingTrack(params?: CurrentlyPlayingTrackParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### startResumePlayback(params?: ResumePlaybackParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### pausePlayback(deviceId?: string)

#### Parameters:

#### Return:

#### Example
```typescript

```

### skipToNext(deviceId?: string)

#### Parameters:

#### Return:

#### Example
```typescript

```

### skipToPrevious(deviceId?: string)

#### Parameters:

#### Return:

#### Example
```typescript

```

### seekToPosition(positionMS: number, optionalParams?: SeekToPositionOptionalParam)

#### Parameters:

#### Return:

#### Example
```typescript

```

### setRepeatMode(state: RepeatState, optionalParams?: SetRepeatModeOptionalParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### setPlaybackVolume(volume: number, optionalParams?: SetPlaybackVolumeOptionalParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### togglePlaybackShuffle(state: boolean, optionalParams: TogglePlaybackShuffleOptionalParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

### getTheUserQueue()

#### Parameters:

#### Return:

#### Example
```typescript

```

### addItemToPlaybackQueue(uri: string, optionalParams: AddItemToPlaybackQueueOptionalParams)

#### Parameters:

#### Return:

#### Example
```typescript

```

