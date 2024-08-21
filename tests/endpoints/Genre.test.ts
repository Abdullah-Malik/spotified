import { Genre } from '../../src/endpoints/Genre';

jest.mock('../../src/client/ReadWriteBaseClient');

describe('Genre', () => {
  let genre: Genre;

  beforeEach(() => {
    genre = new Genre({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAvailableGenreSeeds', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockResponse = {
        genres: ['rock', 'pop', 'jazz', 'classical'],
      };
      (genre['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await genre.getAvailableGenreSeeds();

      expect(genre['get']).toHaveBeenCalledWith('/recommendations/available-genre-seeds');
      expect(result).toEqual(mockResponse);
    });
  });
});
