import {Component, OnDestroy} from '@angular/core';
import {SittersManagementService} from "../sitters-management.service";
import {AppState} from "../../../state/app.state";
import {Store} from "@ngrx/store";
import {selectIsUserLogged} from "../../../state/user/user.selectors";
import {setDefaultParamsSitterReviewsList} from "../../../state/reviews/reviews.actions";

@Component({
  selector: 'app-sitter-page',
  templateUrl: './sitter-page.component.html',
  styleUrls: ['./sitter-page.component.scss']
})
export class SitterPageComponent implements OnDestroy {

  pending$ = this.sitterService.pending$;
  sitter$ = this.sitterService.sitter$;
  isLoggedIn$ = this.store.select(selectIsUserLogged)

  constructor(private readonly sitterService: SittersManagementService,
              private store: Store<AppState>) {
  }

  ngOnDestroy() {
    this.store.dispatch(setDefaultParamsSitterReviewsList());
  }
}
