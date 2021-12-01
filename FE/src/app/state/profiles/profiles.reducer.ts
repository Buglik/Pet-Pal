import {createReducer, on} from "@ngrx/store";
import {
  changePaginationParamsProfileList,
  setDefaultParamsProfileList,
  updateProfilesError,
  updateProfilesSuccess
} from "./profiles.actions";
import {ProfilesListState} from "./profiles.state";

export const initialState: ProfilesListState = {
  profiles: [],
  paginationParams: {
    pagination: 15,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0
  },
  pending: false
}
export const profilesReducer = createReducer(
  initialState,
  on(setDefaultParamsProfileList, (state) => ({
    ...state,
    ...initialState,
    pending: true
  })),
  on(changePaginationParamsProfileList, (state, paginationParams) => ({
    ...state,
    paginationParams,
    pending: true
  })),
  on(updateProfilesSuccess, (state, page) => ({
    ...state,
    profiles: page.data,
    paginationParams: {
      pagination: page.pageSize,
      pageNumber: page.pageIndex,
      totalPages: 10,
      // totalPages: page.pagesTotal,
      totalElements: page.length,
    },
    pending: false
  })),
  on(updateProfilesError, (state) => ({
    ...state,
    pending: false
  }))
)
