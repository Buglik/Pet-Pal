import {ReviewResponse} from "../../../api/src";
import {TablePaginationParams} from "../sitters/sitters.actions";

export interface SitterReviewsState {
  username?: string,
  reviews: ReviewResponse[],
  paginationParams: TablePaginationParams,
  pending: boolean;
}
