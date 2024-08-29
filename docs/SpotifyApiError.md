# SpotifyApiError

The `SpotifyApiError` class is a custom error type used to represent errors returned by the Spotify API. It extends the built-in `Error` class and provides additional properties specific to Spotify API errors.

## Properties

- `status`: (number) The HTTP status code of the error response.
- `statusText`: (string) The HTTP status text associated with the status code.
- `endpoint`: (string) The API endpoint that was being accessed when the error occurred.
- `requestParams`: (any, optional) The parameters that were sent with the request.
- `details`: (any, optional) Additional details about the error, typically including the error message from Spotify.
- `retryAfter`: (number, optional) The number of seconds to wait before retrying the request, if applicable.

## Constructor

```typescript
constructor(
  status: number,
  statusText: string,
  endpoint: string,
  requestParams?: any,
  details?: any,
  retryAfter?: number
)
```

Creates a new `SpotifyApiError` instance.

## Usage

```typescript
import { Spotified, SpotifyApiError } from 'spotified';

const spotified = new Spotified({ clientId: 'your_client_id', clientSecret: 'your_client_secret' });

async function fetchTracks() {
  try {
    // This call might throw a SpotifyApiError if the track IDs are invalid
    const tracks = await spotified.track.getSeveralTracks(['invalid_id_1', 'invalid_id_2']);
    console.log('Tracks:', tracks);
  } catch (error) {
    if (error instanceof SpotifyApiError) {
      console.error(`Spotify API Error ${error.status}: ${error.statusText}`);
      console.error(`Endpoint: ${error.endpoint}`);
      console.error(`Details: ${JSON.stringify(error.details)}`);
      if (error.retryAfter) {
        console.error(`Retry after ${error.retryAfter} seconds`);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

fetchTracks();
```

