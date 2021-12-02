import {MeResponse} from "../../../api/src";
import {TablePaginationParams} from "../sitters/sitters.actions";

export interface ProfilesListState {
  profiles: MeResponse[],
  paginationParams: TablePaginationParams,
  pending: boolean;
}

