# Genre Class

This class provides methods to interact with the Spotify Web API and retrieve information about available genre seeds.

## Methods

### getAvailableGenreSeeds()

This method is used to retrieve a list of available genre seed parameter values for recommendations.

#### Endpoint: [/recommendations/available-genre-seeds](https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres)

#### Parameters:

This method does not take any parameters.

#### Returns: `{ genres: string[] }`

The response object contains:
- `genres`: An array of strings, where each string is a genre seed.

#### Example

```typescript
const genreSeeds = await spotified.genre.getAvailableGenreSeeds();
console.log('Available genre seeds:');
genreSeeds.genres.forEach(genre => console.log(genre));
```
