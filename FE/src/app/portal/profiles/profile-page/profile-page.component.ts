import {Component} from '@angular/core';
import {selectIsUserLogged} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {TablePaginationParams} from "../../../state/sitters/sitters.actions";
import {
  selectSitterReviewListPaginationParams,
  selectSitterReviewListPending,
  selectSitterReviews
} from "../../../state/reviews/reviews.selectors";
import {changePaginationParamsSitterReviewsList} from "../../../state/reviews/reviews.actions";
import {ProfilesDisplayManagementService} from "../profiles-display-management.service";
import {ReviewService} from "../../pet-sitters/review.service";
import {take} from "rxjs/operators";
import {NavigationService} from "../../../navigation.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  pending$ = this.profileService.pending$;
  profile$ = this.profileService.profile$;
  isLoggedIn$ = this.store.select(selectIsUserLogged)

  reviews$ = this.store.select(selectSitterReviews);
  reviewsPending$ = this.store.select(selectSitterReviewListPending);
  reviewsPagination$ = this.store.select(selectSitterReviewListPaginationParams);

  constructor(private readonly profileService: ProfilesDisplayManagementService,
              private reviewService: ReviewService,
              private navigationService: NavigationService,
              private store: Store<AppState>) {
  }

  // ngOnDestroy() {
  //   this.store.dispatch(setDefaultParamsSitterReviewsList());
  // }

  openAddReviewModal() {
    this.profile$.pipe(take(1)).subscribe(next =>
      this.reviewService.openAddReviewForm(next))
  }

  dispatchPagination(params: TablePaginationParams) {
    this.store.dispatch(changePaginationParamsSitterReviewsList(params))
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage();
  }
}
