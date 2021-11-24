import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState, sitterReviewsFeature} from "../app.state";
import {SitterReviewsState} from "./reviews.state";

export const selectSittersFeature = createFeatureSelector<AppState, SitterReviewsState>(sitterReviewsFeature);

export const selectSitterUsername = createSelector(
  selectSittersFeature,
  (state: SitterReviewsState) => state.username,
)

export const selectSitterReviewListPaginationParams = createSelector(
  selectSittersFeature,
  (state: SitterReviewsState) => state.paginationParams,
)

export const selectSitterReviewListPending = createSelector(
  selectSittersFeature,
  (state: SitterReviewsState) => state.pending,
)

export const selectSitterReviews = createSelector(
  selectSittersFeature,
  (state: SitterReviewsState) => state.reviews,
)
