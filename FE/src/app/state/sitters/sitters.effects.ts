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
import {selectSittersListPaginationParams} from "./sitters.selectors";
import {PetSittersService} from "../../../api/src";

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
      withLatestFrom(this.store.select(selectSittersListPaginationParams)),
      switchMap(([_, pagination]) => {
        return this.sitterController.petSittersGetPaginatedRetrieve(pagination.pageNumber + 1, pagination.pagination).pipe(
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
