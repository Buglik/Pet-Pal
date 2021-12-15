import {createAction, props} from "@ngrx/store";
import {PetSitterPageResponse} from "../../../api/src";

export interface TablePaginationParams {
  pagination: number;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface SitterListFilters {
  address: string | null,
  period: {
    startDate: Date,
    endDate: Date
  } | null
}


export const setDefaultParamsSitterList = createAction('[SitterList] Set default params');

export const changeFiltersSitterList = createAction('[SitterList-Filters] Change params', props<SitterListFilters>());
export const changePaginationParamsSitterList = createAction('[SitterList-Pagination] Change params', props<TablePaginationParams>());

export const updateSitters = createAction('[SitterList] Update sitters');
export const updateSittersSuccess = createAction('[SitterList] Update sitters success', props<PetSitterPageResponse>());
export const updateSittersError = createAction('[SitterList] Update sitters error');
