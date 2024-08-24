# Search Class

This class provides methods to interact with the Spotify Web API and retrieve information about searchs.

### Methods

#### searchForItem(q: string, type: string[], optionalParams?: SearchOptionalParams)

This method searches the Spotify catalog for items that match a keyword string.

#### Endpoint:  [/search](https://developer.spotify.com/documentation/web-api/reference/search)

#### Parameters: 
- `q` (required): A string representing the search query keyword(s) and optional field filters and operators.
- `type` (required): An array of item types to search across. Valid types are: `album`, `artist`, `playlist`, `track`, `show`, `episode`, `audiobook`.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".
  - `limit`: The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first result to return. Default: 0 (the first object).
  - `includeExternal`: If `audio` is specified, the response will include any relevant audio content that is hosted externally.

#### Returns:  `SearchResponse`

The `SearchResponse` object contains the search results for tracks
- `artists`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `Track` objects
- `albums`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `Artist` objects
- `playlists`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `SimplifiedAlbum` objects
- `shows`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `SimplifiedShow` objects
- `episodes`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `SimplifiedEpisode` objects
- `audiobooks`: It extends Pagination Response Props(href,limit,offset,total, next, previous) and contains items: it has an array of `SimplifiedAudiobook` objects

#### Example
```typescript
const searchResults = await spotified.search.searchForItem('The Beatles', ['artist', 'album'], { market: 'US', limit: 10 });
searchResults.artists?.items.forEach(artist => {
  console.log(`Artist: ${artist.name}`);
});
searchResults.albums?.items.forEach(album => {
  console.log(`Album: ${album.name}`);
});
```


