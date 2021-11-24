import {createAction, props} from "@ngrx/store";
import {ReviewPageResponse} from "../../../api/src";
import {TablePaginationParams} from "../sitters/sitters.actions";


// REVIEWS
export const setDefaultParamsSitterReviewsList = createAction('[Sitter-Reviews] Set default params');
export const setUsername = createAction('[Sitter-Reviews] Set username', props<{ username: string }>());

export const changePaginationParamsSitterReviewsList = createAction('[Sitter-Reviews-Pagination] Change params', props<TablePaginationParams>());

export const updateSitterReviews = createAction('[Sitter-Reviews] Update sitters');
export const updateSitterReviewsSuccess = createAction('[Sitter-Reviews] Update sitters success', props<ReviewPageResponse>());
export const updateSitterReviewsError = createAction('[Sitter-Reviews] Update sitters error');
