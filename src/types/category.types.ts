import { Image, PaginationParams } from './shared.types';

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
  categories: {
    href: string;
    items: Category[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
