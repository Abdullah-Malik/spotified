# Spotified

Spotified is a strongly typed Spotify Web API SDK designed for both the Browser and Node environments. It offers a user-friendly interface for interacting with the Spotify API, supporting all authorization flows and API endpoints. 

Spotified requires Node.js 18.0.0 or higher and a modern browser as it uses `fetch` for making HTTP requests in the Browser and Node. The SDK includes both ESM and CommonJS builds, ensuring that it can be used in the Browser and Node.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Authorization Flows](#authorization-flows)
  - [Making API Calls](#making-api-calls)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Test Coverage](#test-coverage)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install Spotified using npm:

```bash
npm install spotified
```

Or using yarn:

```bash
yarn add spotified
```

## Usage

### Initialization

First, import and initialize the Spotified client:

```typescript
import Spotified from 'spotified';

const spotified = new Spotified({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET', // Only required for certain flows
});
```

### Authorization Flows

Spotified supports various authorization flows. Choose the one that best fits your application's needs:

1. Authorization Code Flow: Best for long-running applications in secure environments, such as web apps running on a server.

2. Authorization Code Flow with PKCE (Proof Key for Code Exchange): Ideal for mobile and desktop applications, or any scenario where the client secret can't be safely stored.

3. Client Credentials Flow: Suitable for server-to-server authentication where your application needs to access its own data rather than a user's data.

4. Implicit Grant Flow: Best for client-side applications that need short-lived access tokens and can't securely store a client secret.

For detailed implementation of these flows, please refer to the examples and API documentation.

### Making API Calls

Before making any calls to endpoints other than auth ones, don't forget to call the `spotified.setBearerToken()` function with the obtained access token. This sets up the necessary authentication for subsequent API calls.

Once authenticated, you can make API calls using the various endpoints provided by Spotified. It's recommended to use try-catch blocks to handle potential errors, including `SpotifyApiError` for Spotify-specific errors:

```typescript
import { SpotifyApiError } from 'spotified';

async function fetchSpotifyData() {
  try {
    // Ensure you've set the bearer token before making API calls
    // spotified.setBearerToken(accessToken);

    // Search for tracks
    const searchResults = await spotified.search.searchForItem('Bohemian Rhapsody', ['track'], { limit: 5 });
    console.log(searchResults.tracks.items);

    // Get a user's profile
    const userProfile = await spotified.user.getCurrentUserProfile();
    console.log(userProfile);

    // Get an artist
    const artist = await spotified.artist.getArtist('0TnOYISbd1XYRBk9myaseg');
    console.log(artist);

    // Get a user's top tracks
    const topTracks = await spotified.user.getUsersTopItems('tracks', { time_range: 'medium_term', limit: 10 });
    console.log(topTracks);
  } catch (error) {
    if (error instanceof SpotifyApiError) {
      console.error('Error message:', error.message);
      console.error('Status:', error.status);
      console.error('Details:', error.details);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

fetchSpotifyData();
```

## Examples

You can find Node.js and React examples in the `/examples/` directory:

- Node.js example: `/examples/node-example/`
- React example: `/examples/react-example/`

### Running the Node.js Example

To run the Node.js example:

1. Navigate to the `/examples/node-example/` directory.
2. Create a `.env` file in this directory with your Spotify API credentials:
   ```
   client_id=your_client_id
   client_secret=your_client_secret
   ```
3. Run `npm build` to build the project.
4. Run `npm run start` to start the example.

### Running the React Example

To run the React example:

1. Navigate to the `/examples/react-example/` directory.
2. Create a `.env` file in this directory with your Spotify API client ID:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
   ```
3. Run `npm start` to start the React development server.
4. The app will run on `localhost:3000`.

Make sure you have added the appropriate callback URL (`http://localhost:3000/callback`) to your Spotify Developer Dashboard for the React example to work correctly.

## API Reference

For a complete list of available methods and their parameters, please refer to the [API documentation](/docs/).

## Test Coverage

Spotified maintains a high level of test coverage, currently at 98%. This ensures the reliability and stability of the SDK.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.