# Chapter Class

This class provides methods to interact with the Spotify Web API and retrieve information about audiobook chapters.

## Methods

### getChapter(id: string, optionalParams?: GetChapterOptionalParams)

This method retrieves Spotify catalog information for a single audiobook chapter identified by its unique Spotify ID. Chapters are only available in certain markets, including the US, UK, Canada, Ireland, New Zealand, and Australia.

#### Endpoint:  [/chapters/{id}](https://developer.spotify.com/documentation/web-api/reference/get-a-chapter)

#### Parameters 
- `id` (required): A string representing the Spotify ID of the chapter.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns:  `Chapter`

The `Chapter` object contains the following properties:
- `audio_preview_url`: A string URL or null for a preview of the chapter's audio.
- `available_markets`: An array of strings representing the markets where the chapter is available.
- `chapter_number`: A number indicating the chapter's position in the audiobook.
- `description`: A string containing a brief description of the chapter.
- `html_description`: A string containing the chapter's description in HTML format.
- `duration_ms`: A number representing the duration of the chapter in milliseconds.
- `explicit`: A boolean indicating whether the chapter contains explicit content.
- `external_urls`: An `ExternalUrls` object containing external URLs for the chapter.
- `href`: A string URL to the Web API endpoint providing full details of the chapter.
- `id`: A string representing the Spotify ID of the chapter.
- `images`: An array of `Image` objects representing the chapter's images.
- `is_playable`: A boolean indicating whether the chapter is playable in the market.
- `languages`: An array of strings representing the languages of the chapter.
- `name`: A string representing the chapter's name.
- `release_date`: A string representing the release date of the chapter.
- `release_date_precision`: A string indicating the precision of the release date (e.g., "year", "month", "day").
- `resume_point`: An optional `ResumePoint` object indicating the user's current position in the chapter.
- `type`: A string indicating the type of the object (e.g., "chapter").
- `uri`: A string representing the Spotify URI for the chapter.
- `restrictions`: An optional `Restrictions` object containing any restrictions on the chapter.

**Example:**
```typescript
const chapter = await spotified.chapter.getChapter('chapterId', { market: 'US' });
console.log(chapter.name);
console.log(chapter.description);
```

### getSeveralChapters(ids: string[], optionalParams?: GetChapterOptionalParams)

#### Endpoint: [/chapters](https://developer.spotify.com/documentation/web-api/reference/get-several-chapters)

#### Parameters:

- `ids` (required): An array of strings representing the Spotify IDs for the chapters.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".

#### Returns: `Chapters`

The `Chapters` object contains an array of `Chapter` objects (see `getChapter` return type for `Chapter` object structure).

#### Example

```typescript
const chapters = await spotified.chapter.getSeveralChapters(['chapterId1', 'chapterId2'], { market: 'US' });
chapters.forEach(chapter => {
  console.log(`${chapter.name} - ${chapter.description}`);
});
```
