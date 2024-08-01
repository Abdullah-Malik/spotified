import { Category } from '../../src/endpoints/Category';
import { CategoryList, Category as SingleBrowseCategory } from '../../src/types';

jest.mock('../../src/client/ReadWriteBaseClient');

describe('Category', () => {
  let category: Category;

  beforeEach(() => {
    category = new Category({} as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getSingleBrowseCategory', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockCategoryId = 'party';
      const mockParams = { country: 'US', locale: 'en_US' };
      const mockResponse: SingleBrowseCategory = {
        href: 'https://api.spotify.com/v1/browse/categories/party',
        icons: [{ height: null, url: 'https://example.com/image.jpg', width: null }],
        id: 'party',
        name: 'Party',
      };
      (category['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await category.getSingleBrowseCategory(mockCategoryId, mockParams);

      expect(category['get']).toHaveBeenCalledWith(`/browse/categories/${mockCategoryId}`, mockParams);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSeveralBrowseCategories', () => {
    it('should call get method with correct params and return expected result', async () => {
      const mockParams = { country: 'US', locale: 'en_US', limit: 10, offset: 0 };
      const mockResponse: CategoryList = {
        categories: {
          href: 'https://api.spotify.com/v1/browse/categories?offset=0&limit=10',
          items: [
            {
              href: 'https://api.spotify.com/v1/browse/categories/party',
              icons: [{ height: 274, url: 'https://example.com/image.jpg', width: 274 }],
              id: 'party',
              name: 'Party',
            },
          ],
          limit: 10,
          next: 'https://api.spotify.com/v1/browse/categories?offset=10&limit=10',
          offset: 0,
          previous: null,
          total: 10,
        },
      };
      (category['get'] as jest.Mock).mockResolvedValue(mockResponse);

      const result = await category.getSeveralBrowseCategories(mockParams);

      expect(category['get']).toHaveBeenCalledWith('/browse/categories', mockParams);
      expect(result).toEqual(mockResponse);
    });
  });
});
