import {createReducer, on} from "@ngrx/store";
import {SittersListState} from "./sitters.state";
import {
  changeFiltersSitterList,
  changePaginationParamsSitterList,
  setDefaultParamsSitterList,
  updateSittersError,
  updateSittersSuccess
} from "./sitters.actions";

export const initialState: SittersListState = {
  sitters: [],
  filterParams: {
    address: null,
    period: null,
    pets: null
  },
  paginationParams: {
    pagination: 15,
    pageNumber: 0,
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
  on(changeFiltersSitterList, (state, filterParams) => ({
    ...state,
    filterParams,
    pending: true
  })),
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
      totalPages: page.pagesTotal,
      totalElements: page.length,
    },
    pending: false
  })),
  on(updateSittersError, (state) => ({
    ...state,
    pending: false
  }))
)
