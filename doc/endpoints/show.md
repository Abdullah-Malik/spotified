# Show Class

This class provides methods to interact with the Spotify Web API and retrieve information about shows.

## Methods

### getShow(id: string, optionalParams?: GetShowParams)

This method is used to get Spotify catalog information for a single show identified by its unique Spotify ID.

#### Endpoint: [/shows/{id}](https://developer.spotify.com/documentation/web-api/reference/get-a-show)

#### Parameters:

- `id` (required): A string representing the Spotify ID of the show.
- `optionalParams` (optional): An object of type `GetShowParams` contaning:
    - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `Show`

The `Show` interface extends `SimplifiedShow` and contains the following additional property:
- `available_markets`: An array of strings
- `copyrights`: An array of `Copyright` objects
- `description`: A string
- `html_description`: A string
- `explicit`: A boolean
- `external_urls`: A `ExternalUrls` object
- `href`: A string
- `id`: A string
- `images`: An array of Images
- `is_externally_hosted`: A boolean
- `languages`: An array of strings
- `media_type`: A string
- `name`: A string
- `publisher`: A string
- `type`: 'show'
- `uri`: A string
- `total_episodes`: A number
- `episodes`: it extends Pagination Response Props and has an array of `SimplifiedEpisode` objects 

#### Example

```typescript
const show = await spotified.show.getShow('showId', { market: 'US' });
console.log(show.name);
console.log(`Total episodes: ${show.total_episodes}`);
```

### getSeveralShows(ids: string[], optionalParams?: GetShowParams)

This method is used to get Spotify catalog information for several shows based on their Spotify IDs.

#### Endpoint: [/shows](https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the shows.
- `optionalParams` (optional): An object of type `GetShowParams` contains:
    - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: An array of `SimplifiedShow` objects

#### Example

```typescript
const shows = await spotified.show.getSeveralShows(['showId1', 'showId2'], { market: 'US' });
shows.forEach(show => {
    console.log(`${show.name} - Total episodes: ${show.total_episodes}`);
});
```

### getShowsEpisodes(id: string, optionalParams: GetShowEpisodesOptionalParams)

This method is used to get Spotify catalog information about a show's episodes.

#### Endpoint: [/shows/{id}/episodes](https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes)

#### Parameters:

- `id` (required): A string representing the Spotify ID of the show.
- `optionalParams` (optional): An object of type `GetShowEpisodesOptionalParams`:
  - `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first track to return. Default: 0 (the first object).
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `ShowEpisodes`

The `ShowEpisodes` interface extends `PaginationResponseProps` and contains:
- `items`: An array of `SimplifiedEpisode` objects.
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved episodes

#### Example

```typescript
const showEpisodes = await spotified.show.getShowsEpisodes('showId', { limit: 20, offset: 0, market: 'US' });
console.log(`Total episodes: ${showEpisodes.total}`);
showEpisodes.items.forEach(episode => {
    console.log(`${episode.name} - Duration: ${episode.duration_ms}ms`);
});
```

### getUsersSavedShows(optionalParams?: GetUsersSavedShowsOptionalParams)

This method is used to get a list of shows saved in the current Spotify user's library.

#### Endpoint: [/me/shows](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows)

#### Parameters:

- `optionalParams` (optional): An object of type `GetUsersSavedShowsOptionalParams` contains:
  - `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first track to return. Default: 0 (the first object).

#### Returns: `UserSavedShows`

The `UserSavedShows` interface extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved episodes
- `items`: An array of `SavedShows` objects, each containing:
  - `added_at`: A string representing the date and time the show was saved
  - `show`: A `SimplifiedShow` object

#### Example

```typescript
const savedShows = await spotified.show.getUsersSavedShows({ limit: 20, offset: 0 });
console.log(`Total saved shows: ${savedShows.total}`);
savedShows.items.forEach(item => {
    console.log(`${item.show.name} saved on ${item.added_at}`);
});
```

### saveShowsForUser(ids: string[])

This method is used to save one or more shows to the current Spotify user's library.

#### Endpoint: [/me/shows](https://developer.spotify.com/documentation/web-api/reference/save-shows-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the shows to be saved.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.show.saveShowsForUser(['showId1', 'showId2']);
console.log('Shows saved successfully');
```

### removeUsersShows(ids: string[], optionalParams: RemoveUsersShowsOptionalParams)

This method is used to delete one or more shows from the current Spotify user's library.

#### Endpoint: [/me/shows](https://developer.spotify.com/documentation/web-api/reference/remove-shows-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the shows to be removed.
- `optionalParams` (optional): An object of type `RemoveUsersShowsOptionalParams`:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.show.removeUsersShows(['showId1', 'showId2'], { market: 'US' });
console.log('Shows removed successfully');
```

### checkUsersSavedShows(ids: string[])

This method is used to check if one or more shows is already saved in the current Spotify user's library.

#### Endpoint: [/me/shows/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the shows to check.

#### Returns: An array of boolean values

Each boolean in the array corresponds to the show ID in the same position in the request. `true` indicates that the show is saved in the user's library.

#### Example

```typescript
const savedStatus = await spotified.show.checkUsersSavedShows(['showId1', 'showId2']);
savedStatus.forEach((isSaved, index) => {
    console.log(`Show ${index + 1} is saved: ${isSaved}`);
});
```
