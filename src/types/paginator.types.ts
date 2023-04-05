export type RequestQuery = Record<string, string | number | boolean | string[] | undefined>;

export interface PaginationParams {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface PageResult<T> extends PaginationParams {
  items: T[];
}
