# Episode Class

This class provides methods to interact with the Spotify Web API and retrieve information about episodes.

## Methods

### getEpisode(id: string, optionalParams?: GetEpisodeParams)

This method is used to get Spotify catalog information for a single episode identified by its unique Spotify ID.

#### Endpoint: [/episodes/{id}](https://developer.spotify.com/documentation/web-api/reference/get-an-episode)

#### Parameters:

- `id` (required): A string representing the Spotify ID of the episode.
- `optionalParams` (optional): An object of type `GetEpisodeParams` containing:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `Episode`

The `Episode` interface extends `SimplifiedEpisode` and contains the following :
- `audio_preview_url`: A string or null object
- `description`: A string
- `html_description`: A string
- `duration_ms`: A number
- `explicit`: A boolean
- `external_urls`: An `ExternalUrls` object
- `href`: A string
- `id`: A string
- `images`: An array of `Image` onjects
- `is_externally_hosted`: A boolean
- `is_playable`: A boolean
- `languages`: An array of strings
- `name`: A string
- `release_date`: A string
- `release_date_precision`: A string
- `resume_point`?: A `ResumePoint` object
- `type`: 'episode'
- `uri`: A string
- `restrictions`?: A `Restrictions` object
- `show`: A `SimplifiedShow` object

#### Example

```typescript
const episode = await spotified.episode.getEpisode('episodeId', { market: 'US' });
console.log(episode.name);
console.log(episode.show.name);
```

### getSeveralEpisodes(ids: string[], optionalParams?: GetEpisodeParams)

This method is used to get Spotify catalog information for several episodes based on their Spotify IDs.

#### Endpoint: [/episodes](https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the episodes.
- `optionalParams` (optional): An object of type `GetEpisodeParams` containing:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: An array of `Episode` objects

#### Example

```typescript
const episodes = await spotified.episode.getSeveralEpisodes(['episodeId1', 'episodeId2'], { market: 'US' });
episodes.forEach(episode => {
    console.log(`${episode.name} from ${episode.show.name}`);
    console.log(`Duration: ${episode.duration_ms}ms`);
});
```

### getUserSavedEpisodes(optionalParams?: GetSavedEpisodeParams)

This method is used to get a list of the episodes saved in the current Spotify user's library.

#### Endpoint: [/me/episodes](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes)

#### Parameters:

- `optionalParams` (optional): An object of type `GetSavedEpisodeParams` conataing:
    - `limit`: The maximum number of items to return.
    - `offset`: The index of the first item to return.
    - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `UserSavedEpisodes`

The `UserSavedEpisodes` interface extends `PaginationResponseProps` and contains:
- `items`: An array of `SavedEpisode` objects, each containing:
  - `added_at`: A string representing the date and time the episode was saved
  - `episode`: An `Episode` object (see previous method for `Episode` interface definition)

#### Example

```typescript
const savedEpisodes = await spotified.episode.getUserSavedEpisodes({ limit: 50, offset: 0, market: 'US' });
console.log(`Total saved episodes: ${savedEpisodes.total}`);
savedEpisodes.items.forEach(item => {
    console.log(`${item.episode.name} saved on ${item.added_at}`);
});
```

### saveEpisodesForCurrentUser(ids: string[])

This method is used to save one or more episodes to the current user's library.

#### Endpoint: [/me/episodes](https://developer.spotify.com/documentation/web-api/reference/save-episodes-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the episodes to be saved.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.episode.saveEpisodesForCurrentUser(['episodeId1', 'episodeId2']);
console.log('Episodes saved successfully');
```

### removeUserSavedEpisodes(ids: string[])

This method is used to remove one or more episodes from the current user's library.

#### Endpoint: [/me/episodes](https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the episodes to be removed.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.episode.removeUserSavedEpisodes(['episodeId1', 'episodeId2']);
console.log('Episodes removed successfully');
```

### checkUserSavedEpisodes(ids: string[])

This method is used to check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.

#### Endpoint: [/me/episodes/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the episodes to check.

#### Returns: An array of boolean values

Each boolean in the array corresponds to the episode ID in the same position in the request. `true` indicates that the episode is saved in the user's library.

#### Example

```typescript
const savedStatus = await spotified.episode.checkUserSavedEpisodes(['episodeId1', 'episodeId2']);
savedStatus.forEach((isSaved, index) => {
    console.log(`Episode ${index + 1} is saved: ${isSaved}`);
});
```