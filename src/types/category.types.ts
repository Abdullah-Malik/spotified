import { Image, PaginationParams, PaginationResponseProps } from './shared.types.js';

export interface GetSingleBrowseCategoryOptionalParams {
  locale: string;
}

export interface GetSeveralBrowseCategoryParams extends PaginationParams {
  locale?: string;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface CategoryList {
  categories: { items: Category[] } & PaginationResponseProps;
}
