import {Component, OnDestroy} from '@angular/core';
import {SittersManagementService} from "../sitters-management.service";
import {AppState} from "../../../state/app.state";
import {Store} from "@ngrx/store";
import {selectIsUserLogged} from "../../../state/user/user.selectors";
import {
  changePaginationParamsSitterReviewsList,
  setDefaultParamsSitterReviewsList
} from "../../../state/reviews/reviews.actions";
import {
  selectSitterReviewListPaginationParams,
  selectSitterReviewListPending,
  selectSitterReviews
} from "../../../state/reviews/reviews.selectors";
import {TablePaginationParams} from "../../../state/sitters/sitters.actions";

@Component({
  selector: 'app-sitter-page',
  templateUrl: './sitter-page.component.html',
  styleUrls: ['./sitter-page.component.scss']
})
export class SitterPageComponent implements OnDestroy {

  pending$ = this.sitterService.pending$;
  sitter$ = this.sitterService.sitter$;
  isLoggedIn$ = this.store.select(selectIsUserLogged)

  reviews$ = this.store.select(selectSitterReviews);
  reviewsPending$ = this.store.select(selectSitterReviewListPending);
  reviewsPagination$ = this.store.select(selectSitterReviewListPaginationParams);

  constructor(private readonly sitterService: SittersManagementService,
              private store: Store<AppState>) {
  }

  ngOnDestroy() {
    this.store.dispatch(setDefaultParamsSitterReviewsList());
  }

  dispatchPagination(params: TablePaginationParams) {
    this.store.dispatch(changePaginationParamsSitterReviewsList(params))
  }

}
