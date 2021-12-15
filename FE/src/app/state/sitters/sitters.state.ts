import {PetSitterResponse} from "../../../api/src";
import {SitterListFilters, TablePaginationParams} from "./sitters.actions";

export interface SittersListState {
  sitters: PetSitterResponse[],
  filterParams: SitterListFilters,
  paginationParams: TablePaginationParams,
  pending: boolean;
}

