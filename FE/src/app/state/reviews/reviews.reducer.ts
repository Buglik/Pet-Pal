import {createReducer, on} from "@ngrx/store";
import {SitterReviewsState} from "./reviews.state";
import {
  changePaginationParamsSitterReviewsList,
  setDefaultParamsSitterReviewsList,
  setUsername,
  updateSitterReviewsError,
  updateSitterReviewsSuccess
} from "./reviews.actions";

export const initialState: SitterReviewsState = {
  username: undefined,
  reviews: [],
  paginationParams: {
    pagination: 5,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0
  },
  pending: false
}
export const reviewsReducer = createReducer(
  initialState,
  on(setUsername, (state, {username}) => ({
    ...state,
    username,
    pending: true
  })),
  on(setDefaultParamsSitterReviewsList, (state) => ({
    ...state,
    ...initialState,
    pending: true
  })),
  on(changePaginationParamsSitterReviewsList, (state, paginationParams) => ({
    ...state,
    paginationParams,
    pending: true
  })),
  on(updateSitterReviewsSuccess, (state, page) => ({
    ...state,
    reviews: page.reviews,
    paginationParams: {
      pagination: page.pageSize,
      pageNumber: page.pageIndex,
      totalPages: page.pagesTotal,
      totalElements: page.length,
    },
    pending: false
  })),
  on(updateSitterReviewsError, (state) => ({
    ...state,
    pending: false
  }))
)
