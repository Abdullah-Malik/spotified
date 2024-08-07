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

#### Returns: `Track`

The `Track` object contains the following properties:
- `album`: (Optional) A `SimplifiedAlbum` object
- `artists`: (Optional) An array of `Artist` objects
- `available_markets`: (Optional) An array of string market codes
- `disc_number`: (Optional) A number
- `duration_ms`: (Optional) A number representing duration in milliseconds
- `explicit`: (Optional) A boolean
- `external_ids`: (Optional) An `ExternalIds` object
- `external_urls`: (Optional) An `ExternalUrls` object
- `href`: (Optional) A string URL
- `id`: (Optional) A string
- `is_playable`: (Optional) A boolean
- `linked_from`: (Optional) A partial `LinkedFrom` object
- `restrictions`: (Optional) A `Restrictions` object
- `name`: (Optional) A string
- `popularity`: (Optional) A number
- `preview_url`: (Optional) A string URL
- `track_number`: (Optional) A number
- `type`: (Optional) A string
- `uri`: (Optional) A string
- `is_local`: (Optional) A boolean

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

#### Returns: `Tracks`

The `Tracks` object contains:
- `tracks`: An array of `Track` objects (see `getTrack` return type for `Track` object structure)

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

The `UserSavedTracks` object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SavedTrack` objects, each containing:
  - `added_at`: A string representing the date and time the track was saved
  - `track`: A `Track` object (see `getTrack` return type for `Track` object structure)

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

#### Returns: An array of boolean values

Each boolean in the array corresponds to the track ID in the same position in the request. `true` indicates that the track is saved in the user's library.

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

The `AudioFeatures` object contains various audio features of the track, including:
- `acousticness`: A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
- `danceability`: How suitable a track is for dancing based on a combination of musical elements.
- `energy`: A measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.
- `instrumentalness`: Predicts whether a track contains no vocals.
- `key`: The key the track is in. Integers map to pitches using standard Pitch Class notation.
- `liveness`: Detects the presence of an audience in the recording.
- `loudness`: The overall loudness of a track in decibels (dB).
- `mode`: Indicates the modality (major or minor) of a track.
- `speechiness`: Detects the presence of spoken words in a track.
- `tempo`: The overall estimated tempo of a track in beats per minute (BPM).
- `time_signature`: An estimated overall time signature of a track.
- `valence`: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.

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

The `AudioFeaturesArray` object contains:
- `audio_features`: An array of `AudioFeatures` objects (see `getTracksAudioFeatures` return type for `AudioFeatures` object structure)

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

The `AudioAnalysis` object contains detailed audio analysis information, including:
- `meta`: Metadata about the track and the analysis
- `track`: Overall data about the track
- `bars`: Array of bar markers
- `beats`: Array of beat markers
- `sections`: Array of section markers
- `segments`: Array of segment markers
- `tatums`: Array of tatum markers

Each of these components provides detailed information about different aspects of the track's audio structure and characteristics.

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

The `Recommendations` object contains:
- `seeds`: An array of `RecommendationSeeds` objects, each containing information about the seeds used
- `tracks`: An array of `Track` objects (see `getTrack` return type for `Track` object structure)

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