# Track Class

This class provides methods to interact with the Spotify Web API and retrieve information about tracks.

## Methods

### getTrack(id: string, optionalParams?: GetTrackParams)

This method is used to get information about a single track in the Spotify catalog, identified by its unique Spotify ID.

#### Endpoint: [/tracks/{id}](https://developer.spotify.com/documentation/web-api/reference/get-track)

#### Parameters:

- `id` (required): A string representing the unique Spotify ID for the track.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This includes the information on market, which is a ISO 3166-1 alpha-2 country code.

#### Return: `Track`

#### Example

```typescript
const track = await spotified.track.getTrack('11dFghVXANMlKmJXsNCbNl');
console.log(track);
```

### getTracks(ids: string[], optionalParams?: GetTrackParams)

This method is used to get information about multiple tracks in the Spotify catalog, identified by their unique Spotify IDs.

#### Endpoint: [/tracks](https://developer.spotify.com/documentation/web-api/reference/get-several-tracks)

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This includes the information on market, which is a ISO 3166-1 alpha-2 country code.

#### Returns

A promise that resolves to a `TracksDetail` object, which contains detailed information about the tracks requested.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];
const tracks = await spotified.track.getTracks(trackIds);
console.log(tracks);
```

### getUsersSavedTracks(optionalParams?: OptionalUserSavedTrackParam)

This method is used to get information about multiple tracks saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks)

#### Parameters

- `optionalParams` (optional): An object containing optional parameters to be included in the request. This includes the information on market, which is a ISO 3166-1 alpha-2 country code, limit, which is the maximum number of items to return, and offset, the index of the first item to return, with 0 being the default. 

#### Returns

A promise that resolves to a `UserSavedTracks` object, which contains detailed information about the tracks in user's 'Your Music' library.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];
const tracks = await spotified.track.getUsersSavedTracks(trackIds);
console.log(tracks);
```

### saveTracksforCurrentUser(ids: string[])

This method is used to save one or more tracks to the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/save-tracks-user)

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be saved.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];
const response = await spotified.track.saveTracksforCurrentUser(trackIds);
console.log(response);
```

### removeUsersSavedTracks(ids: string[])

This method is used to remove one or more tracks from the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user)

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs for the tracks to be removed.

#### Returns

A promise that resolves with no value if the operation is successful.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];
const response = await spotified.track.removeUsersSavedTracks(trackIds);
console.log(response);
```

### checkUsersSavedTracks(ids: string[])

This method is used to check if one or more tracks are already saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks)

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

#### Endpoint: [/audio-features](https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features)

#### Parameters

- `id` (required): A string representing the unique Spotify ID for the track to be retrieved.

#### Returns

A promise that resolves with an object containing audio feature information for the specified track.

#### Example

```typescript
const trackId = '7ouMYWpwJ422jRcDASZB7P'; 
const audioFeatures = await spotified.track.getTracksAudioFeatures(trackId);
console.log(audioFeatures);
```

### getMultipleTracksAudioFeatures(ids: string[])

This method is used to get audio feature information for multiple tracks based on their Spotify IDs.

#### Endpoint: [/audio-features/{id}](https://developer.spotify.com/documentation/web-api/reference/get-audio-features)

#### Parameters

- `ids` (required): An array of strings representing the unique Spotify IDs of the tracks for which audio analysis information is to be retrieved.

#### Returns

A promise that resolves with an array of objects, each containing audio feature information for a track in the specified list.

#### Example

```typescript
const trackIds = ['7ouMYWpwJ422jRcDASZB7P','4VqPOruhp5EdPBeR92t6lQ','2takcwOaAZWiXQijPHIx7B'];
const audioFeaturesArray = await spotified.track.getMultipleTracksAudioFeatures(trackIds);
console.log(audioFeaturesArray);
```

### getTracksAudioAnalysis(id: string)

This method is used to get audio analysis for a single track based on its Spotify ID.

#### Endpoint: [/audio-analysis/{id}](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis)

#### Parameters

- `id` (required): A string representing the unique Spotify ID of the track to be retrieved.

#### Returns

A promise that resolves with an object, containing audio analysis information for the track.

#### Example

```typescript
const trackId = '7ouMYWpwJ422jRcDASZB7P'; 
const audioAnalysis = await spotified.track.getTracksAudioAnalysis(trackId);
console.log(audioAnalysis);
```

### getRecommendations(seedParams: RecommendationSeedParams, optionalParams: RecommendationOptionalParams)

This method is used to get recommendations that are generated based on the available information for a given seed entity and matched against similar artists and tracks.

#### Endpoint: [/recommendations](https://developer.spotify.com/documentation/web-api/reference/get-recommendations)

#### Parameters

- `seedParams` (required): An object containing the seed parameters to be included in the object. This object includes the information about the seed_artists, which is a comma separated list of Spotify IDs for seed artists, seed_genres, a comma separated list of Spotify IDs for seed tracks, and seed_tracks, a comma separated list of Spotify IDs for a seed track. You can only provide 5 seed values in any combination of seed_artists, seed_genres, and seed_tracks.
- `optionalParams` (optional): An object containing optional parameters to be included in the request. This includes strings like market and numbers like limit, min_acousticness, target_danceability, max_energy, etc.

#### Returns

A promise that resolves with an object, containing an array of objects called seeds, and an array of Track objects.

#### Example

```typescript
const trackId = '7ouMYWpwJ422jRcDASZB7P'; 
const audioAnalysis = await spotified.track.getTracksAudioAnalysis(trackId);
console.log(audioAnalysis);
```
