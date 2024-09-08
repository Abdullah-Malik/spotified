import React, { useState, useEffect } from 'react';
import { useSpotified } from './hooks/useSpotified';
import './SpotifyWrapped.css';
import { Artist, Track } from 'spotified';

const SpotifyWrapped = () => {
  const [topTracks, setTopTracks] = useState<Track[] | Artist[]>([]);
  const [topArtists, setTopArtists] = useState<Track[] | Artist[]>([]);
  
  const { spotified, isAuthenticated, error, authenticate, handleCallback } = useSpotified(
    process.env.REACT_APP_SPOTIFY_CLIENT_ID || '', 
    `${window.location.origin}/callback`,
    ['user-read-private', 'user-read-email', 'user-top-read']
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && spotified) {
      handleCallback(code);
    }
  }, [spotified, handleCallback]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWrappedData();
    }
  }, [isAuthenticated]);

  const fetchWrappedData = async () => {
    if (!spotified || !isAuthenticated) {
      return;
    }

    try {
      const topTracksData = await spotified.user.getUserTopItems('tracks', { limit: 20, time_range: 'long_term' });
      setTopTracks(topTracksData.items);

      const topArtistsData = await spotified.user.getUserTopItems('artists', { limit: 20, time_range: 'long_term' });
      setTopArtists(topArtistsData.items);
    } catch (err) {
      console.error('Error fetching Wrapped data:', err);
    }
  };

  return (
    <div className="spotify-wrapped">
      <header className="header">
        <h1 className="title">Spotify Wrapped</h1>
      </header>
      <div className="content">
        {!isAuthenticated ? (
          <button className="auth-button" onClick={authenticate}>
            Authenticate with Spotify
          </button>
        ) : (
          <>
            <section className="section">
              <h2 className="section-title">Your Top Tracks</h2>
              <div className="grid-container">
                {topTracks.map((track) => (
                  <div key={(track as Track).id} className="grid-item">
                    <div className="track-image">
                      <img src={(track as Track).album?.images[0].url} alt={track.name} />
                    </div>
                    <div className="track-info">
                      <h3 className="track-name">{track.name}</h3>
                      <p className="track-artist">{(track as Track).artists?.map(artist => artist.name).join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2 className="section-title">Your Top Artists</h2>
              <div className="grid-container">
                {topArtists.map((artist) => (
                  <div key={(artist as Artist).id} className="grid-item">
                    <div className="artist-image">
                      <img src={(artist as Artist).images?.[0]?.url} alt={artist.name} />
                    </div>
                    <div className="artist-info">
                      <h3 className="artist-name">{artist.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
        {error && <p className="error-message">Error: {error}</p>}
      </div>
    </div>
  );
};

export default SpotifyWrapped;