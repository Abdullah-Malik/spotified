import { ReadOnlyBaseClient } from '../client/ReadOnlyBaseClient';
import RequestMaker from '../client-helpers/RequestMaker';
import { RequestQuery, SpotifiedResponse } from '../types';

export abstract class BasePaginator<Item, ApiResponse, ApiParams extends object> extends ReadOnlyBaseClient {
  protected apiResponse: ApiResponse | undefined;

  protected _data: Item[];

  protected _queryParams: Partial<ApiParams>;

  protected nextPageURL: string;

  constructor({
    requestMaker,
    queryParams,
    endpoint,
  }: {
    endpoint: string;
    requestMaker: RequestMaker;
    queryParams: Partial<ApiParams>;
  }) {
    super(requestMaker);
    this._queryParams = queryParams;
    this.nextPageURL = endpoint;
    this._data = [];
  }

  protected abstract updatePaginatorProperties(response: ApiResponse): any;

  protected makeRequest(endpoint: string, queryParams?: Partial<ApiParams>) {
    return this.get<{ data: ApiResponse }>(endpoint, queryParams as RequestQuery, {
      fullResponse: true,
    });
  }

  protected makeNewInstanceFromResult(result: SpotifiedResponse<ApiResponse>, queryParams: Partial<ApiParams>): this {
    // Construct a subclass
    return new (this.constructor as any)({
      realData: result.data,
      queryParams,
      endpoint: this.nextPageURL,
    }) as any;
  }

  protected getEndpoint() {
    return this.nextPageURL;
  }

  async fetchNext() {
    const result = await this.makeRequest(this.nextPageURL);
    this.updatePaginatorProperties(result.data);
  }

  get data(): Item[] {
    return this._data;
  }
}

export default BasePaginator;
