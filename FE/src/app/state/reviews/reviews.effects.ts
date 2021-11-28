import {Injectable} from "@angular/core";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {AppState} from "../app.state";
import {
  changePaginationParamsSitterReviewsList,
  setUsername,
  updateSitterReviews,
  updateSitterReviewsError,
  updateSitterReviewsSuccess,
} from "./reviews.actions";
import {selectSitterReviewListPaginationParams, selectSitterUsername} from "./reviews.selectors";
import {PetSittersService, ReviewsService} from "../../../api/src";

@Injectable()
export class ReviewsEffects {

  private changeReviewsTableParams$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(changePaginationParamsSitterReviewsList, setUsername),
      map(_ => updateSitterReviews())
    ),
  );

  private updateSitterReviews$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSitterReviews),
      withLatestFrom(this.store.select(selectSitterReviewListPaginationParams), this.store.select(selectSitterUsername)),
      switchMap(([_, pagination, username]) => {
        return this.reviewsController.reviewsPaginatedRetrieve(pagination.pageNumber + 1, pagination.pagination, username).pipe(
          map(page => updateSitterReviewsSuccess(page)),
          catchError(error => of(updateSitterReviewsError())),
        )
      })
    ),
  );

  constructor(private actions$: Actions,
              private readonly store: Store<AppState>,
              private sitterController: PetSittersService,
              private reviewsController: ReviewsService) {
  }
}
