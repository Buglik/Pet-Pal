import {Injectable} from "@angular/core";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {AppState} from "../app.state";
import {selectProfilesListPaginationParams} from "./profiles.selectors";
import {ProfileService} from "../../../api/src";
import {
  changePaginationParamsProfileList,
  setDefaultParamsProfileList,
  updateProfiles,
  updateProfilesError,
  updateProfilesSuccess
} from "./profiles.actions";

@Injectable()
export class ProfilesEffects {

  private changeTableParams$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(changePaginationParamsProfileList, setDefaultParamsProfileList),
      map(_ => updateProfiles())
    ),
  );

  private updateProfiles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfiles),
      withLatestFrom(this.store.select(selectProfilesListPaginationParams)),
      switchMap(([_, pagination]) => {
        return this.profilesController.profileAllList(pagination.pageNumber + 1, pagination.pagination).pipe(
          map(page => updateProfilesSuccess(page[0])),
          catchError(error => of(updateProfilesError())),
        )
      })
    ),
  );

  constructor(private actions$: Actions,
              private readonly store: Store<AppState>,
              private profilesController: ProfileService) {
  }
}
