import {ProfileResponse} from "../../../api/src";
import {TablePaginationParams} from "../sitters/sitters.actions";

export interface ProfilesListState {
  profiles: ProfileResponse[],
  paginationParams: TablePaginationParams,
  pending: boolean;
}

