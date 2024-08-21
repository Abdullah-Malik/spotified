import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Genre extends ReadWriteBaseClient {
  /**
   * Retrieve a list of available genres seed parameter values for recommendations.
   * https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
   */
  getAvailableGenreSeeds() {
    return this.get<{ genres: string[] }>('/recommendations/available-genre-seeds');
  }
}

export default Genre;
