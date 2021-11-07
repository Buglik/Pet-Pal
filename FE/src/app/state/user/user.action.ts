import {createAction, props} from "@ngrx/store";
import {LoginRequest, LoginResponse, MeResponse} from "../../../api/src";

export const loginUser = createAction('[Auth] Login user', props<LoginRequest>());
export const loginUserSuccess = createAction('[Auth] Login user success', props<LoginResponse>());
export const loginUserError = createAction('[Auth] Login user error', props<any>());

export const logoutUser = createAction('[Auth] Logout user');
export const logoutUserSuccess = createAction('[Auth] Logout user success');
export const logoutUserError = createAction('[Auth] Logout user error');


export const getUser = createAction('[Auth] Get user data');
export const getUserSuccess = createAction('[Auth] Get user data success', props<MeResponse>());
export const getUserError = createAction('[Auth] Get user data error');
