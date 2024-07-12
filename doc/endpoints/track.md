# Track Class

This class provides methods to interact with the Spotify Web API and retrieve information about tracks.

## Methods

### getTrack(id: string, optionalParams?: GetTrackParams)

This method is used to get information about a single track in the Spotify catalog, identified by its unique Spotify ID.

#### Endpoint: [/tracks/{id}](https://developer.spotify.com/documentation/web-api/reference/get-track)

#### Parameters:

- `id` (required): A string representing the unique Spotify ID for the track.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This can include market, additional market values, and request timeout.

#### Return: `TrackDetail`

#### Example

```typescript
const track = await spotified.track.getTrack('trackId');
console.log(track);
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
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];

const tracks = await spotified.track.getTracks(trackIds);
console.log(tracks);
```

### saveTracksforCurrentUser(ids: string[])

This method is used to save one or more tracks to the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be saved.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];

const response = await spotified.track.saveTracksforCurrentUser(trackIds)
console.log(response)
```

### removeUsersSavedTracks(ids: string[])

This method is used to remove one or more tracks from the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be removed.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];

const response = await spotified.track.removeUsersSavedTracks(trackIds)
console.log(response)
```

### checkUsersSavedTracks(ids: string[])

This method is used to check if one or more tracks are already saved in the current Spotify user's 'Your Music' library.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be checked.

#### Returns

A promise that resolves with an array of boolean values indicating whether or not the corresponding track in the `ids` parameter is saved in the current user's library.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];

const results = await spotified.track.checkUsersSavedTracks(trackIds);
results.forEach((isSaved, index) => {
    const trackId = trackIds[index];
    console.log(`Track ${trackId} is saved: ${isSaved}`);
});
```

### getTracksAudioFeatures(id: string)

This method is used to get audio feature information for a single track identified by its unique Spotify ID.

#### Parameters

- `id` (required): A string representing the unique Spotify ID for the track to be retrieved.

#### Returns

A promise that resolves with an object containing audio feature information for the specified track.

#### Example

```typescript
const trackId = '7ouMYWpwJ422jRcDASZB7P'; 

const audioFeatures = await spotified.track.getTracksAudioFeatures(trackId)
console.log(audioFeatures)
```

### getMultipleTracksAudioFeatures(ids: string[])

This method is used to get audio feature information for multiple tracks based on their Spotify IDs.

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be retrieved.

#### Returns

A promise that resolves with an array of objects, each containing audio feature information for a track in the specified list.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];

const audioFeaturesArray = await spotified.track.getMultipleTracksAudioFeatures(trackIds)
console.log(audioFeaturesArray)
```

### getTracksAudioAnalysis(id: string)

This method is used to get audio analysis for a single track based on its Spotify ID.

#### Parameters

- `id` (required): A string representing the unique Spotify ID of the track to be retrieved.

#### Returns

A promise that resolves with an object, containing audio analysis information for the track.

#### Example

```typescript
const trackId = '7ouMYWpwJ422jRcDASZB7P'; 

const audioAnalysis = await spotified.track.getTracksAudioAnalysis(trackId)
console.log(audioAnalysis)
```
