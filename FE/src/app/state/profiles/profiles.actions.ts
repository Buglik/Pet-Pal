import {createAction, props} from "@ngrx/store";
import {ProfilePageResponse} from "../../../api/src";
import {TablePaginationParams} from "../sitters/sitters.actions";

export const setDefaultParamsProfileList = createAction('[ProfilesList] Set default params');

export const changePaginationParamsProfileList = createAction('[ProfilesList-Pagination] Change params', props<TablePaginationParams>());

export const updateProfiles = createAction('[ProfilesList] Update profiles');
export const updateProfilesSuccess = createAction('[ProfilesList] Update profiles success', props<ProfilePageResponse>());
export const updateProfilesError = createAction('[ProfilesList] Update profiles error');
