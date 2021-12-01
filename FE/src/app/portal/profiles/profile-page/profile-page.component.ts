import {Component, OnDestroy} from '@angular/core';
import {selectIsUserLogged} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {TablePaginationParams} from "../../../state/sitters/sitters.actions";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnDestroy {

  // pending$ = this.sitterService.pending$;
  // sitter$ = this.sitterService.sitter$;
  isLoggedIn$ = this.store.select(selectIsUserLogged)

  constructor(
    // private readonly sitterService: SittersManagementService,
              private store: Store<AppState>) {
  }

  ngOnDestroy() {
    // this.store.dispatch(setDefaultParamsSitterReviewsList());
  }

  dispatchPagination(params: TablePaginationParams) {
    // this.store.dispatch(changePaginationParamsSitterReviewsList(params))
  }

}
