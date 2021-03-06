import {createSelector} from "@ngrx/store";
import {UserState} from "./user.state";
import {AppState} from "../app.state";

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user || null
)

export const selectIsUserLogged = createSelector(
  selectUserState,
  (state: UserState) => !!state.user
)

export const selectUserPending = createSelector(
  selectUserState,
  (state: UserState) => state.pending
)

export const selectLoginErrors = createSelector(
  selectUserState,
  (state: UserState) => state.error
)
