import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Genre extends ReadWriteBaseClient {
  getAvailableGenreSeeds() {
    return this.get<{ genres: string[] }>('/recommendations/available-genre-seeds');
  }
}

export default Genre;
