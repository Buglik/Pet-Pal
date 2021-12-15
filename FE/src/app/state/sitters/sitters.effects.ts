import {Injectable} from "@angular/core";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {AppState} from "../app.state";
import {
  changeFiltersSitterList,
  changePaginationParamsSitterList,
  setDefaultParamsSitterList,
  updateSitters,
  updateSittersError,
  updateSittersSuccess
} from "./sitters.actions";
import {selectSittersListFilterParams, selectSittersListPaginationParams} from "./sitters.selectors";
import {PetSittersService} from "../../../api/src";
import * as moment from "moment";

@Injectable()
export class SittersEffects {

  private changeTableParams$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(changePaginationParamsSitterList, setDefaultParamsSitterList, changeFiltersSitterList),
      map(_ => updateSitters())
    ),
  );

  private updateSitters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSitters),
      withLatestFrom(this.store.select(selectSittersListPaginationParams), this.store.select(selectSittersListFilterParams)),
      switchMap(([_, pagination, filters]) => {
        return this.sitterController.petSittersGetPaginatedRetrieve(filters?.address || undefined,
          filters?.period?.endDate ? moment(filters?.period?.endDate).format('YYYY-MM-DD') : undefined,
          pagination.pageNumber + 1,
          filters.pets || undefined,
          pagination.pagination,
          filters?.period?.endDate ? moment(filters?.period?.startDate).format('YYYY-MM-DD') : undefined,
        ).pipe(
          map(page => updateSittersSuccess(page)),
          catchError(error => of(updateSittersError())),
        )
      })
    ),
  );

  constructor(private actions$: Actions,
              private readonly store: Store<AppState>,
              private sitterController: PetSittersService) {
  }
}
