# Track Class

This class provides methods to interact with the Spotify Web API and retrieve information about tracks.

## Methods

### getTrack(id: string, optionalParams?: GetTrackParams)

This method is used to get Spotify catalog information for a single track identified by its unique Spotify ID.

#### Endpoint: [/tracks/{id}](https://developer.spotify.com/documentation/web-api/reference/get-track)

#### Parameters:

- `id` (required): A string representing the Spotify ID of the track.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `TrackDetail`

#### Example

```typescript
const track = await spotified.track.getTrack('trackId', { market: 'US' });
console.log(track.name);
console.log(track.artists[0].name);
```

### getTracks(ids: string[], optionalParams?: GetTrackParams)

This method is used to get Spotify catalog information for multiple tracks based on their Spotify IDs.

#### Endpoint: [/tracks](https://developer.spotify.com/documentation/web-api/reference/get-several-tracks)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the tracks.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `TracksDetail`

#### Example

```typescript
const tracks = await spotified.track.getTracks(['trackId1', 'trackId2'], { market: 'US' });
tracks.tracks.forEach(track => {
    console.log(`${track.name} by ${track.artists[0].name}`);
});
```

### getUsersSavedTracks(optionalParams?: OptionalUserSavedTrackParams)

This method is used to get a list of the songs saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks)

#### Parameters:

- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first track to return. Default: 0 (the first object).
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `UserSavedTracks`

#### Example

```typescript
const savedTracks = await spotified.track.getUsersSavedTracks({ limit: 50, offset: 0 });
console.log(`Total saved tracks: ${savedTracks.total}`);
savedTracks.items.forEach(item => {
    console.log(`${item.track.name} saved on ${item.added_at}`);
});
```

### saveTracksforCurrentUser(ids: string[])

This method is used to save one or more tracks to the current user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/save-tracks-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the tracks to be saved.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.track.saveTracksforCurrentUser(['trackId1', 'trackId2']);
console.log('Tracks saved successfully');
```

### removeUsersSavedTracks(ids: string[])

This method is used to remove one or more tracks from the current user's 'Your Music' library.

#### Endpoint: [/me/tracks](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the tracks to be removed.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.track.removeUsersSavedTracks(['trackId1', 'trackId2']);
console.log('Tracks removed successfully');
```

### checkUsersSavedTracks(ids: string[])

This method is used to check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/tracks/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the tracks to check.

#### Returns: An array of booleans

#### Example

```typescript
const results = await spotified.track.checkUsersSavedTracks(['trackId1', 'trackId2']);
results.forEach((isSaved, index) => {
    console.log(`Track ${index + 1} is saved: ${isSaved}`);
});
```

### getTracksAudioFeatures(id: string)

This method is used to get audio feature information for a single track identified by its unique Spotify ID.

#### Endpoint: [/audio-features/{id}](https://developer.spotify.com/documentation/web-api/reference/get-audio-features)

#### Parameters:

- `id` (required): A string representing the Spotify ID for the track.

#### Returns: `AudioFeatures`

#### Example

```typescript
const audioFeatures = await spotified.track.getTracksAudioFeatures('trackId');
console.log(`Danceability: ${audioFeatures.danceability}`);
console.log(`Energy: ${audioFeatures.energy}`);
```

### getMultipleTracksAudioFeatures(ids: string[])

This method is used to get audio features for multiple tracks based on their Spotify IDs.

#### Endpoint: [/audio-features](https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the tracks.

#### Returns: `AudioFeaturesArray`

#### Example

```typescript
const audioFeatures = await spotified.track.getMultipleTracksAudioFeatures(['trackId1', 'trackId2']);
audioFeatures.audio_features.forEach((feature, index) => {
    console.log(`Track ${index + 1} - Danceability: ${feature.danceability}, Energy: ${feature.energy}`);
});
```

### getTracksAudioAnalysis(id: string)

This method is used to get a low-level audio analysis for a track in the Spotify catalog.

#### Endpoint: [/audio-analysis/{id}](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis)

#### Parameters:

- `id` (required): A string representing the Spotify ID for the track.

#### Returns: `AudioAnalysis`

#### Example

```typescript
const audioAnalysis = await spotified.track.getTracksAudioAnalysis('trackId');
console.log(`Track duration: ${audioAnalysis.track?.duration} seconds`);
console.log(`Overall loudness: ${audioAnalysis.track?.loudness} dB`);
```

### getRecommendations(seedParams: RecommendationSeedParams, optionalParams: RecommendationOptionalParams)

This method is used to get track recommendations based on seed entities and various parameters.

#### Endpoint: [/recommendations](https://developer.spotify.com/documentation/web-api/reference/get-recommendations)

#### Parameters:

- `seedParams` (required): An object containing seed entities:
  - `seed_artists`: A comma separated list of Spotify IDs for seed artists.
  - `seed_genres`: A comma separated list of any genres in the set of available genre seeds.
  - `seed_tracks`: A comma separated list of Spotify IDs for a seed track.
- `optionalParams` (optional): An object containing optional parameters for tuning the recommendation algorithm.

#### Returns: `Recommendations`

#### Example

```typescript
const recommendations = await spotified.track.getRecommendations(
    { seed_artists: 'artistId1,artistId2', seed_genres: 'pop,rock', seed_tracks: 'trackId1' },
    { limit: 10, min_energy: 0.4, min_popularity: 50 }
);
recommendations.tracks.forEach(track => {
    console.log(`Recommended: ${track.name} by ${track.artists[0].name}`);
});
```