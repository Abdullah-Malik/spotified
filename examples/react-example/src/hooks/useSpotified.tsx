import { useState, useEffect } from 'react';
import Spotified, { OAuth2Scope, SpotifyApiError } from 'spotified';

export const useSpotified = (clientId: string, redirectUrl:string, scopes: OAuth2Scope[]| undefined) => {
  const [spotified, setSpotified] = useState<Spotified | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const spotifiedInstance = new Spotified({ clientId });
    setSpotified(spotifiedInstance);

    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      spotifiedInstance.setBearerToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  }, [clientId]);

  const authenticate = async () => {
    if (!spotified) {
      setError('Spotified instance not initialized');
      return;
    }

    try {
      const authData = await spotified.auth.AuthorizationCodePKCE.generateAuthorizationURL(
        redirectUrl,
        { scope: scopes }
      );

      localStorage.setItem('codeVerifier', authData.codeVerifier);
      
      if (authData.url) {
        window.location.href = authData.url;
      } else {
        throw new Error('Authorization URL is undefined');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to generate authorization URL: ${error.message}`);
        
      }
    }
  };

  const handleCallback = async (code: string) => {
    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      setError('Code verifier not found');
      return;
    }

    try {
      const tokenResponse = await spotified!.auth.AuthorizationCodePKCE.requestAccessToken(
        code,
        codeVerifier,
        redirectUrl
      );

      localStorage.setItem('accessToken', tokenResponse.access_token);
      spotified!.setBearerToken(tokenResponse.access_token);
      setIsAuthenticated(true);
      setError(null);

      localStorage.removeItem('codeVerifier');
      window.history.replaceState({}, document.title, '/');
    } catch (error: SpotifyApiError | unknown) {
      if (error instanceof SpotifyApiError) {
        console.error('Error message:', error.message);
        console.error('Status:', error.status);
        console.error('Details:', error.details);
        setError(`Failed to authenticate: ${error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return { spotified, isAuthenticated, error, authenticate, handleCallback };
};