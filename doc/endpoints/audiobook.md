# Audiobook Class

This class provides methods to interact with the Spotify Web API and retrieve information about audiobooks.

## Methods

### getAudiobook(id: string, optionalParams:  GetAudiobookOptionalParams)

This method is used to get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

#### Endpoint: [/audiobooks/{id}](https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook)

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the audiobook.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code.

#### Return: `AudiobookDetail`

The `AudiobookDetail` Object contains the following properties:
- `authors`: (Required) An array of `Author` objects
- `available_markets`: (Required) An array of strings
- `copyrights`: (Required) An array of `Copyright` object
- `description`: (Required) A string
- `html_description`: (Required) A string
- `edition`: (Optional) A string
- `explicit`: (Required) A boolean
- `external_urls`: (Required) An `ExternalUrls` object
- `href`: (Required) A string
- `id`: (Required) A string
- `images`: (Required) An array of `Image` objects
- `languages`: (Required) An array of strings
- `media_type`: (Required) A string
- `name`: (Required) A string
- `narrators`: (Required) An array of `Narrator` objects
- `publisher`: (Required) A string
- `type`: (Required) A string
- `uri`: (Required) A string
- `total_chapters`: (Required) A number
- `chapters`: (Required) A object extends `PaginationResponseProps` and contains:
    - `href`: A string URL
    - `limit`: A number
    - `next`: A string URL
    - `offset`: A number
    - `previous`: A string URL
    - `total`: A number representing the total number of saved tracks
    - `items`: An array of `SimplifiedChapter` objects


#### Example

```typescript
const audiobook = await client.audiobook.getAudiobook('audiobookId');
console.log(audiobook.name);
console.log(audiobook.publisher);
```

### getSeveralAudiobooks(ids: string[], optionalParams?: GetAudiobookOptionalParams)

This method is used to get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

#### Endpoint: [/audiobooks](https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks)

#### Parameters:

- `ids` (required):An array of strings representing the Spotify IDs for the audiobooks to be saved.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code.

#### Return: `AudiobookDetail[]`

The `AudiobookDetail[]` Object contains an array of `AudiobookDetail` objects.

#### Example

```typescript
const audiobooks = await client.audiobook.getSeveralAudiobooks(['audiobookId1', 'audiobookId2'], { market: 'US' });
audiobooks.authors.forEach(authors => {
    console.log(`${authors.name}`);
});
```

### getAudiobookChapters(id: string, optionalParams?: GetAudiobookChaptersOptionalParams)

This method is used to get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

#### Endpoint: [/audiobooks/{id}/chapters](https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters)

#### Parameters:

- `id` (required): A string representing the unique Spotify ID of the audiobook.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code.
  - `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first track to return. Default: 0 (the first object).

#### Return: `AudiobookChapters`

The `AudiobookChapters` Object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SimplifiedChapter` object

#### Example

```typescript
const audiobookChapters = await client.audiobook.getAudiobookChapters('audiobookId1', { limit: 50, offset: 0 });
console.log(`Total saved chapters: ${audiobookChapters.total}`);
audiobookChapters.items.forEach(item => {
    console.log(`${item.name} is available in languages ${item.languages}`);
});
```

### getUserSavedAudiobook(optionalParams?: GetUserSavedAudiobooksOptionalParams)

This method is used to get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.

#### Endpoint: [/me/audiobooks](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks)

#### Parameters:

- `limit`: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
- `offset`: The index of the first track to return. Default: 0 (the first object).

#### Return: `UserSavedAudiobooks`

The `UserSavedAudiobooks` Object extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `SimplifiedAudiobook` object

#### Example

```typescript
const audiobook = await client.audiobook.getUserSavedAudiobook({ limit: 50, offset: 0 });
console.log(`Total saved audiobooks: ${audiobook.total}`);
audiobook.items.forEach(item => {
    console.log(`${item.name} is available in languages ${item.languages}`);
});
```

### saveAudiobooksforCurrentUser(ids: string[])

This method is used to save one or more audiobooks to the current Spotify user's library.

#### Endpoint: [/me/audiobooks](https://developer.spotify.com/documentation/web-api/reference/save-audiobooks-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the audiobooks to be saved.

#### Return: This endpoint doesn't return any data.

#### Example

```typescript
await client.audiobook.saveAudiobooksforCurrentUser(['audiobookId1', 'audiobookId2']);
console.log('audiobooks saved successfully');
```

### removeUserSavedAudiobooks(ids: string[])

This method is used to remove one or more audiobooks from the Spotify user's library.

#### Endpoint: [/me/audiobooks](https://developer.spotify.com/documentation/web-api/reference/remove-audiobooks-user)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the audiobooks to be saved.


#### Return: This endpoint doesn't return any data.

#### Example

```typescript
await client.audiobook.removeAudiobooksforCurrentUser(['audiobookId1', 'audiobookId2']);
console.log('audiobooks removed successfully');
```

### checkUserSavedAudiobooks(ids: string[])

This method is used to check if one or more audiobooks are already saved in the current Spotify user's library.

#### Endpoint: [/me/audiobooks/contains](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-audiobooks)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the audiobooks to be saved.

#### Return: An array of boolean values

Each boolean in the array corresponds to the audiobook ID in the same position in the request. `true` indicates that the audiobook is saved in the user's library.

#### Example

```typescript
const results = await spotified.audiobook.checkUserSavedAudiobooks (['audiobookId1', 'audiobookId2']);
results.forEach((isSaved, index) => {
    console.log(`audiobook ${index + 1} is saved: ${isSaved}`);
});
```