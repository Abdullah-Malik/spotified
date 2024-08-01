import { ReadWriteBaseClient } from '../client';
import {
  Category as SingleBrowseCategory,
  GetSingleBrowseCategoryOptionalParams,
  CategoryList,
  GetSeveralBrowseCategoryParams,
} from '../types';

export class Category extends ReadWriteBaseClient {
  /**
   * Get a single category used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
   * https://developer.spotify.com/documentation/web-api/reference/get-a-category
   */
  getSingleBrowseCategory(categoryId: string, params?: GetSingleBrowseCategoryOptionalParams) {
    return this.get<SingleBrowseCategory>(`/browse/categories/${categoryId}`, params);
  }

  /**
   * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
   * https://developer.spotify.com/documentation/web-api/reference/get-categories
   */
  getSeveralBrowseCategories(params?: GetSeveralBrowseCategoryParams) {
    return this.get<CategoryList>(`/browse/categories`, params);
  }
}

export default Category;
