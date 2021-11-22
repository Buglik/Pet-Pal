import {Injectable} from "@angular/core";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {AppState} from "../app.state";
import {
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
      ofType(changePaginationParamsSitterList, setDefaultParamsSitterList),
      map(action => updateSitters())
    ),
  );

  private updateClinics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSitters),
      withLatestFrom(this.store.select(selectSittersListPaginationParams)),
      switchMap(([action, pagination]) => {
        return this.sitterController.petSittersGetPaginatedList(pagination.pageNumber, pagination.pagination).pipe(
          // TODO:fix api definition
          map(page => updateSittersSuccess(page[0])),
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
