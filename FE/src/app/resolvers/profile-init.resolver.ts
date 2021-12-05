import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {NavigationService} from "../navigation.service";
import {setDefaultParamsSitterReviewsList, setUsername} from "../state/reviews/reviews.actions";
import {ProfilesDisplayManagementService} from "../portal/profiles/profiles-display-management.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileInitResolver implements Resolve<boolean> {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private navigationService: NavigationService,
              private readonly profileService: ProfilesDisplayManagementService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(setDefaultParamsSitterReviewsList())
    const sitter = this.router.getCurrentNavigation()?.extras.state;
    const username = route.paramMap.get('username')
    console.log(username)
    if (username) {
      if (!sitter) {
        this.profileService.getProfileByUsername(username);
      }
      this.store.dispatch(setUsername({username}))
    } else {
      this.navigationService.back();
    }
    return of(true);
  }
}
