export interface DataResponse<T> {
  data: T;
}

export interface SpotifiedResponse<T> extends DataResponse<T> {
  headers: Headers;
}
