# Track Class

This class provides methods to interact with the Spotify Web API and retrieve information about tracks.

## Methods

### getTrack(id: string, optionalParams?: GetTrackParams)

This method is used to get information about a single track in the Spotify catalog, identified by its unique Spotify ID.

#### Parameters

- `id` (required): A string representing the unique Spotify ID for the track.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This can include market, additional market values, and request timeout.

#### Returns

A promise that resolves to a `TrackDetail` object, which contains detailed information about the track requested.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackId = 'spotify_track_id'; // Replace with a valid Spotify track ID

spotify.track.getTrack(trackId)
  .then((track) => console.log(track))
  .catch((err) => console.error(err));
```

### getTracks(ids: string[], optionalParams?: GetTrackParams)

This method is used to get information about multiple tracks in the Spotify catalog, identified by their unique Spotify IDs.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This can include market, additional market values, and request timeout.

#### Returns

A promise that resolves to a `TracksDetail` object, which contains detailed information about the tracks requested.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackIds = ['spotify_track_id_1', 'spotify_track_id_2', 'spotify_track_id_3']; // Replace with valid Spotify track IDs

spotify.track.getTracks(trackIds)
  .then((tracks) => console.log(tracks))
  .catch((err) => console.error(err));
```

### saveTracksforCurrentUser(ids: string[])

This method is used to save one or more tracks to the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be saved.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackIds = ['spotify_track_id_1', 'spotify_track_id_2', 'spotify_track_id_3']; // Replace with valid Spotify track IDs

spotify.track.saveTracksforCurrentUser(trackIds)
  .then(() => console.log('Tracks saved successfully'))
  .catch((err) => console.error(err));
```

### removeUsersSavedTracks(ids: string[])

This method is used to remove one or more tracks from the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be removed.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackIds = ['spotify_track_id_1', 'spotify_track_id_2', 'spotify_track_id_3']; // Replace with valid Spotify track IDs

spotify.track.removeUsersSavedTracks(trackIds)
  .then(() => console.log('Tracks removed successfully'))
  .catch((err) => console.error(err));
```

### checkUsersSavedTracks(ids: string[])

This method is used to check if one or more tracks are already saved in the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be checked.

#### Returns

A promise that resolves with an array of boolean values indicating whether or not the corresponding track in the `ids` parameter is saved in the current user's library.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackIds = ['spotify_track_id_1', 'spotify_track_id_2', 'spotify_track_id_3']; // Replace with valid Spotify track IDs

spotify.track.checkUsersSavedTracks(trackIds)
  .then((results) => {
    results.forEach((isSaved, index) => {
      const trackId = trackIds[index];
      console.log(`Track ${trackId} is saved: ${isSaved}`);
    });
  })
  .catch((err) => console.error(err));
```

### getTracksAudioFeatures(id: string)

This method is used to get audio feature information for a single track identified by its unique Spotify ID.

#### Parameters

- `id` (required): A string representing the unique Spotify ID for the track to be retrieved.

#### Returns

A promise that resolves with an object containing audio feature information for the specified track.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackId = 'spotify_track_id'; // Replace with a valid Spotify track ID

spotify.track.getTracksAudioFeatures(trackId)
  .then((audioFeatures) => console.log(audioFeatures))
  .catch((err) => console.error(err));
```

### getMultipleTracksAudioFeatures(ids: string[])

This method is used to get audio feature information for multiple tracks based on their Spotify IDs.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be retrieved.

#### Returns

A promise that resolves with an array of objects, each containing audio feature information for a track in the specified list.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackIds = ['spotify_track_id_1', 'spotify_track_id_2']; // Replace with valid Spotify track IDs

spotify.track.getMultipleTracksAudioFeatures(trackIds)
  .then((audioFeaturesArray) => console.log(audioFeaturesArray))
  .catch((err) => console.error(err));
```

### getTracksAudioAnalysis(id: string)

This method is used to get audio analysis for a single track based on its Spotify ID.

#### Parameters

- `id` (required): A string representing the unique Spotify ID of the track to be retrieved.

#### Returns

A promise that resolves with an object, containing audio analysis information for the track.

#### Example

```typescript
const token = 'your_access_token_here';
const spotify = new Spotified(token);
const trackId = 'spotify_track_id'; // Replace with valid Spotify track IDs

spotify.track.getTracksAudioAnalysis(trackId)
  .then((audioAnalysis) => console.log(audioAnalysis))
  .catch((err) => console.error(err));
```
