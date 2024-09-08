/* eslint-disable */
const { Spotified, SpotifyApiError } = require('spotified');
require('dotenv').config();

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

if (!client_id || !client_secret) {
  console.error('Please set client_id and client_secret in your .env file');
  process.exit(1);
}

const client = new Spotified({
  clientId: client_id,
  clientSecret: client_secret,
});

async function verifySpotified() {
  try {
    console.log('Initializing Spotified client...');

    // Using Client Credentials flow
    const tokens = await client.auth.ClientCredentials.requestAccessToken();
    client.setBearerToken(tokens.access_token);

    console.log('\nGet artist by ID...');
    const artistId = '1dfeR4HaWDbWqFHLkxsg1d'; // Queen
    const artist = await client.artist.getArtist(artistId);
    console.log('Artist:', artist);
  } catch (error) {
    if (error instanceof SpotifyApiError) {
      console.error('Spotify API error:', error as Error);
    } else {
      console.error('An error occurred:', error);
    }
  }
}

verifySpotified();
