import {getUserError, getUserSuccess, loginUser, loginUserError, logoutUser} from "./user.action";
import {UserState} from "./user.state";
import {createReducer, on} from "@ngrx/store";

export const initialState: UserState = {
  user: null,
  pending: false,
  error: null
}

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    error: null,
    pending: true
  })),
  on(logoutUser, (state) => ({
    ...state,
    error: null,
    pending: false,
    user: null
  })),
  on(loginUserError, (state) => ({
    ...state,
    // error
    pending: false
  })),
  on(getUserSuccess, (state, user) => ({
    ...state,
    pending: false,
    user
  })),
  on(getUserError, (state) => ({
    ...state,
    user: null,
    // error
    pending: false
  })),
)