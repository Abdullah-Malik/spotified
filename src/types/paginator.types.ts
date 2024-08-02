export type RequestQuery = Record<string, string | number | boolean | string[] | undefined>;

export interface PaginationResponseProps {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface PageResult<T> extends PaginationResponseProps {
  items: T[];
}
