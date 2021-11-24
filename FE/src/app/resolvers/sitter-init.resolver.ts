import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SittersManagementService} from "../portal/pet-sitters/sitters-management.service";
import {NavigationService} from "../navigation.service";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {setUsername} from "../state/reviews/reviews.actions";

@Injectable({
  providedIn: 'root'
})
export class SitterInitResolver implements Resolve<boolean> {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private navigationService: NavigationService,
              private readonly sitterService: SittersManagementService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const sitter = this.router.getCurrentNavigation()?.extras.state;
    const username = route.paramMap.get('username')
    if (username) {
      if (!sitter) {
        this.sitterService.getSitterByUsername(username)
      }
      this.store.dispatch(setUsername({username}))
    } else {
      this.navigationService.back();
    }
    return of(true);
  }
}
