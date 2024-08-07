# Artist Class

This class provides methods to interact with the Spotify Web API and retrieve information about artists.

## Methods

### getArtist(id: string)

This method is used to get Spotify catalog information for a single artist identified by their unique Spotify ID.

#### Endpoint: <a href="https://developer.spotify.com/documentation/web-api/reference/get-an-artist" target="_blank">/artists/{id}</a>

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the artist.

#### Return: `ArtistProfile`

The `ArtistProfile` Object contains the following properties:
- `external_urls`: (Optional) An `ExternalUrls` object
- `href`: (Optional) A string URL
- `id`: (Optional) A string
- `name`: (Optional) A string
- `type`: (Optional) A string
- `uri`: (Optional) A string
- `followers`: (Optional) A `Followers` object
- `genres`: (Optional) An array of strings
- `images`: (Optional) An array of `Image` object
- `popularity`: (Optional) A number

#### Example

```typescript
const artist = await spotified.artist.getArtist('ArtistId');
console.log(artist.name);
console.log(artist.genres[0]);
```

### getArtists(ids: string[])

This method is used to get Spotify catalog information for several artists based on their Spotify IDs.

#### Endpoint: <a href="https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists" target="_blank">/artists</a>

#### Parameters:

- `id` (required): An array of strings representing the Spotify IDs for the artists, with a maximum of 50 IDs.

#### Return: `ArtistsProfile`

The `ArtistsProfile` object contains:
- `ArtistsProfile`: An array of `ArtistProfile` objects (see `getArtist` return type for `ArtistProfile` object structure)

#### Example

```typescript
const artists = await spotified.artist.getartists(['artistId1', 'artistId2']);
artists.artists.forEach(artist => {
    console.log(`${artist.name} with the genre: ${artist.genres[0]}`);
});
```

### getArtistAlbums(artistId: string, optionalParams?: OptionalArtistAlbumParams)

This method is used to get Spotify catalog information about an artist's albums.

#### Endpoint: <a href="https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums" target="_blank">/artists/{id}/albums</a>

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the artist.
- `optionalParams` (optional): An object containing optional parameters:
    - `limit`: The maximum number of items to return, with the default is 20, minimum is 1 and maximum is 50.
    - `offset`: The index of the first track to return. Default: 0 (the first object).
    - `includeGroups`: A comma-separated list of keywords that will be used to filter the response which if not supplied will lead to all album types being returned.(valid values are : album, single, appears_on, compilation)
    - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Return: `ArtistAlbumResult`

The `ArtistAlbumResult` object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SimplifiedArtistAlbum` objects, each containing:
    - `album_group`: A string
    - `album_type`: A string
    - `artists`: An array of `SimplifiedArtist` object 
    - `available_markets`: An array of strings
    - `external_urls`: An `ExternalUrls` object
    - `href`: A string URL
    - `id`: A string
    - `images`: A array of `Image` object
    - `name`: A string
    - `release_date`: A string 
    - `release_date_precision`: A string 
    - `restrictions`: A `Restrictions` object
    - `total_tracks`: A number
    - `type`: A string
    - `uri`: A string

#### Example

```typescript
const artist = await spotified.artist.getArtistAlbums('ArtistId', );
console.log(artist.name);
console.log(artist.genres[0]);
```

### getArtistTopTracks(id: string, optionalParams?: GetMarketParams) 

This method is used to get Spotify catalog information about an artist's top tracks by country.

#### Endpoint: <a href="https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks" target="_blank">/artists/{id}/top-tracks</a>

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the artist.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Return: `Tracks`

The `Tracks` object contains:
- `tracks`: An array of `Track` objects (see `getTrack` return type for `Track` object structure)

#### Example

```typescript
const artist = await client.track.getTrack('artistId');
console.log(track);
```

### getRelatedArtists(id: string)

This method is used to get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.

#### Endpoint: <a href="https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists" target="_blank">/artists/{id}/related-artists
</a>

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the artist.

#### Return: `ArtistsProfile`

The `ArtistsProfile` object contains:
- `ArtistsProfile`: An array of `ArtistProfile` objects (see `getArtist` return type for `ArtistProfile` object structure)


#### Example

```typescript
const artists = await spotified.artist.getartists('artistId1');
artists.artists.forEach(artist => {
    console.log(`${artist.name} with the genre: ${artist.genres[0]}`);
});
```