import {createReducer, on} from "@ngrx/store";
import {SittersListState} from "./sitters.state";
import {
  changePaginationParamsSitterList,
  setDefaultParamsSitterList,
  updateSittersError,
  updateSittersSuccess
} from "./sitters.actions";

export const initialState: SittersListState = {
  sitters: [],
  // sortParams: {
  //   sortType: 'asc',
  //   sortField: ['name'],
  // },
  paginationParams: {
    pagination: 15,
    pageNumber: 1,
    totalPages: 0,
    totalElements: 0
  },
  pending: false
}
export const sittersReducer = createReducer(
  initialState,
  on(setDefaultParamsSitterList, (state) => ({
    ...state,
    ...initialState,
    pending: true
  })),
  // on(changeSortingParamsSitterList, (state, sortParams) => ({
  //   ...state,
  //   sortParams,
  //   pending: true
  // })),
  on(changePaginationParamsSitterList, (state, paginationParams) => ({
    ...state,
    paginationParams,
    pending: true
  })),
  on(updateSittersSuccess, (state, page) => ({
    ...state,
    sitters: page.sitters,
    paginationParams: {
      pagination: page.pageSize,
      pageNumber: page.pageIndex,
      totalPages: Math.ceil(page.length / page.pageSize),
      totalElements: page.length,
    },
    pending: false
  })),
  on(updateSittersError, (state) => ({
    ...state,
    pending: false
  }))
)