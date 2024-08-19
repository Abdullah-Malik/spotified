# Market Class

This class provides methods to interact with the Spotify Web API and retrieve information about available markets.

## Methods

### getAvailableMarkets()

This method is used to get the list of markets where Spotify is available.

#### Endpoint: [/markets](https://developer.spotify.com/documentation/web-api/reference/get-available-markets)

#### Parameters:

This method does not take any parameters.

#### Returns: `{ markets: string[] }`

The response object contains:
- `markets`: An array of strings, where each string is an ISO 3166-1 alpha-2 country code.

#### Example

```typescript
const availableMarkets = await client.market.getAvailableMarkets();
console.log('Spotify is available in the following markets:');
availableMarkets.markets.forEach(market => console.log(market));
```