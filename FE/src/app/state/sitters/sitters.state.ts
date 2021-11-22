import {PetSitterResponse} from "../../../api/src";
import {TablePaginationParams} from "./sitters.actions";

export interface SittersListState {
  sitters: PetSitterResponse[],
  // sortParams: TableSortingParams,
  paginationParams: TablePaginationParams,
  pending: boolean;
}

