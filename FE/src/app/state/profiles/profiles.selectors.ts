import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState, profileListFeature} from "../app.state";
import {ProfilesListState} from "./profiles.state";

export const selectProfilesFeature = createFeatureSelector<AppState, ProfilesListState>(profileListFeature);

export const selectProfilesListPaginationParams = createSelector(
  selectProfilesFeature,
  (state: ProfilesListState) => state.paginationParams,
)

export const selectProfilesListPending = createSelector(
  selectProfilesFeature,
  (state: ProfilesListState) => state.pending,
)

export const selectProfiles = createSelector(
  selectProfilesFeature,
  (state: ProfilesListState) => state.profiles,
)
