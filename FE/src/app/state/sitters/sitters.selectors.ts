import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState, sitterListFeature} from "../app.state";
import {SittersListState} from "./sitters.state";

export const selectSittersFeature = createFeatureSelector<AppState, SittersListState>(sitterListFeature);

export const selectSittersListFilterParams = createSelector(
  selectSittersFeature,
  (state: SittersListState) => state.filterParams,
)

export const selectSittersListPaginationParams = createSelector(
  selectSittersFeature,
  (state: SittersListState) => state.paginationParams,
)

export const selectSittersListPending = createSelector(
  selectSittersFeature,
  (state: SittersListState) => state.pending,
)

export const selectSitters = createSelector(
  selectSittersFeature,
  (state: SittersListState) => state.sitters,
)
