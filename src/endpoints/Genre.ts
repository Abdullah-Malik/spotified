import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Genre extends ReadWriteBaseClient {
  getAvailableGenreSeeds() {
    this.get<{ genres: string[] }>('/recommendations/available-genre-seeds');
  }
}

export default Genre;
