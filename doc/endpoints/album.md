# Album Class

This class provides methods to interact with the Spotify Web API and retrieve information about artists.

## Methods

###  getAlbum(id: string, optionalParams?: GetMarketParams)

This method is used to get Spotify catalog information for a single album identified by their unique Spotify ID.

#### Endpoint: [/albums/{id}](https://developer.spotify.com/documentation/web-api/reference/get-an-album)

#### Parameters: 

- `id` (required): A string representing the unique Spotify ID of the artist.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `Album`

The `Album` object contains the following properties:
- `album_type`: (Required) A string;
- `artists`: (Required) An array of `SimplifiedArtist` objects;
- `available_markets`: (Required) An array of string market codes;
- `external_urls`: (Required) An `ExternalUrls` object;
- `href`: (Required) A string;
- `id`: (Required) A string;
- `images`: (Required) a array of `Image` object;
- `name`: (Required) A string;
- `release_date`: (Required) A string;
- `release_date_precision`: (Required) A string;
- `restrictions`: (Optional) A `Restrictions` object;
- `total_tracks`: (Required) A number;
- `type`: (Required) A string;
- `uri`: (Required) A string;
- `tracks`: (Required) A `AlbumTracks` object;
- `copyrights`: (Required) A array of `Copyright` objects;
- `external_ids`: (Required) An `ExternalIds` object;
- `genres`: (Required) An array of string market codes;
- `label`: (Required) A string;
- `popularity`: (Required) A number;

#### Example

```typescript
const album = await spotified.album.getAlbum('albumId', { market: 'US' });
console.log(album.name);
console.log(album.artists[0].name);
```

### getSeveralAlbums(ids: string[], optionalParams?: GetAlbumOptionalParams)

This method is used to get Spotify catalog information for multiple albums identified by their Spotify IDs.

#### Endpoint: [/albums](https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the albums.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: An array of `Album` objects

#### Example

```typescript
const albums = await client.album.getSeveralAlbums(['albumId1', 'albumId2'], { market: 'US' });
albums.forEach(album => {
    console.log(`${album.name} by ${album.artists[0].name}`);
});
```

### getAlbumTracks(id: string, optionalParams?: GetAlbumTracksOptionalParams)

This method is used to get Spotify catalog information about an album's tracks. Optional parameters can be used to limit the number of tracks returned.

#### Endpoint: [/albums/{id}/tracks](https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks)

#### Parameters:

- `id` (required): A string representing the Spotify ID of the album.
- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first track to return. Default: 0 (the first object).
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `AlbumTracks`

The `AlbumTracks` object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SimplifiedTrack` objects

#### Example

```typescript
const tracks = await client.album.getAlbumTracks('albumId', { limit: 50, offset: 0 });
console.log(`Total tracks: ${tracks.total}`);
tracks.items.forEach(track => {
    console.log(`${track.name} - Track number: ${track.track_number}`);
});
```

### getUserSavedAlbum(optionalParams?: GetUserSavedAlbumsOptionalParams)

This method is used to get a list of the albums saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/albums](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums)

#### Parameters:

- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of albums to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first album to return. Default: 0 (the first object).
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `UserSavedAlbum`

The `UserSavedAlbum` object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SavedAlbum` objects, each containing:
  - `added_at`: A string representing the date and time the album was saved
  - `album`: An `Album` object

#### Example

```typescript
const savedAlbums = await client.album.getUserSavedAlbum({ limit: 50, offset: 0 });
console.log(`Total saved albums: ${savedAlbums.total}`);
savedAlbums.items.forEach(item => {
    console.log(`${item.album.name} saved on ${item.added_at}`);
});
```

### saveAlbumsforCurrentUser(ids: string[])

This method is used to save one or more albums to the current user's 'Your Music' library.

#### Endpoint: [/me/albums](https://developer.spotify.com/documentation/web-api/reference/save-albums-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the albums to be saved.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await client.album.saveAlbumsforCurrentUser(['albumId1', 'albumId2']);
console.log('Albums saved successfully');
```

### removeUsersSavedAlbum(ids: string[])

This method is used to remove one or more albums from the current user's 'Your Music' library.

#### Endpoint: [/me/albums](https://developer.spotify.com/documentation/web-api/reference/remove-albums-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the albums to be removed.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await client.album.removeUsersSavedAlbum(['albumId1', 'albumId2']);
console.log('Albums removed successfully');
```

### checkUsersSavedAlbums(ids: string[])

This method is used to check if one or more albums is already saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/albums/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the albums to check.

#### Returns: An array of boolean values

Each boolean in the array corresponds to the album ID in the same position in the request. `true` indicates that the album is saved in the user's library.

#### Example

```typescript
const results = await client.album.checkUsersSavedAlbums(['albumId1', 'albumId2']);
results.forEach((isSaved, index) => {
    console.log(`Album ${index + 1} is saved: ${isSaved}`);
});
```

### getNewReleases(optionalParams?: GetNewReleasesOptionalParams)

This method is used to get a list of new album releases featured in Spotify.

#### Endpoint: [/browse/new-releases](https://developer.spotify.com/documentation/web-api/reference/get-new-releases)

#### Parameters:

- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first item to return. Default: 0 (the first object).

#### Returns: `PagedAlbums`

The `PagedAlbums` object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SimplifiedAlbum` objects

#### Example

```typescript
const newReleases = await client.album.getNewReleases({ limit: 20, offset: 0 });
console.log(`Total new releases: ${newReleases.total}`);
newReleases.items.forEach(album => {
    console.log(`${album.name} by ${album.artists[0].name}`);
});
```

