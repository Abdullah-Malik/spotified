import { PageResult } from '../types';
import BasePaginator from './base.paginator';

export class SpotifiedPaginator<
  Item,
  ApiResponse extends PageResult<Item>,
  ApiParams extends object
> extends BasePaginator<Item, ApiResponse, ApiParams> {
  protected updatePaginatorProperties(apiResponse: ApiResponse) {
    this._data.push(...apiResponse.items);
    this.nextPageURL = apiResponse.next;
  }
}

export default SpotifiedPaginator;
