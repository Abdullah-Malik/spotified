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



