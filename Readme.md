# Spotified

Spotified is a strongly typed Spotify Web API SDK designed for both the Browser and Node environments. It offers a user-friendly interface for interacting with the Spotify API, supporting all authorization flows and API endpoints. 

Spotified requires Node.js 18.0.0 or higher and a modern browser as it uses `fetch` for making HTTP requests in the Browser and Node. The SDK includes both ESM and CommonJS builds, ensuring that it can be used in the Browser and Node.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Authorization Flows](#authorization-flows)
    - [Authorization Code Flow](#authorization-code-flow)
    - [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce)
    - [Client Credentials Flow](#client-credentials-flow)
    - [Implicit Grant Flow](#implicit-grant-flow)
  - [Making API Calls](#making-api-calls)
- [API Reference](#api-reference)
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

Spotified supports various authorization flows. Choose the one that best fits your application's needs.

#### Authorization Code Flow

This flow is suitable for long-running applications where a user grants permission only once.

```typescript
import React, { useEffect, useState } from 'react';
import Spotified from 'spotified';

const SpotifyAuth = () => {
  const [spotified] = useState(new Spotified({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
  }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleAuth = async () => {
    const authData = spotified.auth.AuthorizationCode.generateAuthorizationURL(
      'http://localhost:3000/callback',
      {
        scope: ['user-read-private', 'user-read-email'],
      }
    );
    window.location.href = authData.url;
  };

  const handleCallback = async (code) => {
    try {
      const tokenResponse = await spotified.auth.AuthorizationCode.requestAccessToken({
        code,
        redirectUri: 'http://localhost:3000/callback',
      });
      spotified.setBearerToken(tokenResponse.access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleAuth}>Authenticate with Spotify</button>
      ) : (
        <p>Authenticated successfully!</p>
      )}
    </div>
  );
};

export default SpotifyAuth;
```

#### Authorization Code Flow with PKCE

This flow is recommended for mobile and desktop applications where the client secret can't be safely stored.

```javascript
import React, { useEffect, useState } from 'react';
import Spotified from 'spotified';

const SpotifyAuthPKCE = () => {
  const [spotified] = useState(new Spotified({ clientId: 'YOUR_CLIENT_ID' }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleAuth = async () => {
    const authData = await spotified.auth.AuthorizationCodePKCE.generateAuthorizationURL(
      'http://localhost:3000/callback',
      {
        scope: ['user-read-private', 'user-read-email'],
      }
    );
    localStorage.setItem('codeVerifier', authData.codeVerifier);
    window.location.href = authData.url;
  };

  const handleCallback = async (code) => {
    const codeVerifier = localStorage.getItem('codeVerifier');
    try {
      const tokenResponse = await spotified.auth.AuthorizationCodePKCE.requestAccessToken(
        code,
        codeVerifier,
        'http://localhost:3000/callback'
      );
      spotified.setBearerToken(tokenResponse.access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleAuth}>Authenticate with Spotify</button>
      ) : (
        <p>Authenticated successfully!</p>
      )}
    </div>
  );
};

export default SpotifyAuthPKCE;
```

#### Client Credentials Flow

This flow is suitable for server-to-server authentication where user authorization isn't required.

```typescript
import Spotified from 'spotified';

const spotified = new Spotified({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
});

async function authenticateAndSearch() {
  try {
    const tokenResponse = await spotified.auth.ClientCredentials.requestAccessToken();
    spotified.setBearerToken(tokenResponse.access_token);
    
    const searchResults = await spotified.search.searchForItem('Bohemian Rhapsody', ['track'], { limit: 5 });
    console.log(searchResults.tracks.items);
  } catch (error) {
    console.error('Error:', error);
  }
}

authenticateAndSearch();
```

#### Implicit Grant Flow

This flow is suitable for client-side applications where the access token is returned directly to the client.

```typescript
import React, { useEffect, useState } from 'react';
import Spotified from 'spotified';

const SpotifyImplicitGrant = () => {
  const [spotified] = useState(new Spotified({ clientId: 'YOUR_CLIENT_ID' }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      handleCallback(hash);
    }
  }, []);

  const handleAuth = () => {
    const authData = spotified.auth.ImplicitGrant.generateAuthorizationURL(
      'http://localhost:3000/callback',
      {
        scope: ['user-read-private', 'user-read-email'],
      }
    );
    window.location.href = authData.url;
  };

  const handleCallback = (hash) => {
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    if (accessToken) {
      spotified.setBearerToken(accessToken);
      setIsAuthenticated(true);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleAuth}>Authenticate with Spotify</button>
      ) : (
        <p>Authenticated successfully!</p>
      )}
    </div>
  );
};

export default SpotifyImplicitGrant;
```

### Making API Calls

Once authenticated, you can make API calls using the various endpoints provided by Spotified. It's recommended to use try-catch blocks to handle potential errors, including `SpotifyApiError` for Spotify-specific errors:

```typescript
import { SpotifyApiError } from 'spotified';

async function fetchSpotifyData() {
  try {
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

## API Reference

For a complete list of available methods and their parameters, please refer to the [API documentation](/docs/).

## Test Coverage

Spotified maintains a high level of test coverage, currently at 98%. This ensures the reliability and stability of the SDK.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.