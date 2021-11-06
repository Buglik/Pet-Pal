import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectUser} from "../state/user/user.selectors";
import {catchError, map, mergeMap} from "rxjs/operators";
import {getUserSuccess} from "../state/user/user.action";
import {ProfileService} from "../../api/src";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router,
              private readonly profileService: ProfileService) {
  }

  private tryGetMe(): Observable<boolean> {
    return this.profileService.profilemeRetrieve().pipe(
      map(user => {
        this.store.dispatch(getUserSuccess(user));
        return true;
      }),
      catchError(_ => of(false))
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      mergeMap(user => {
        return user ? of(true) : this.tryGetMe()
      }),
      map(result => {
        if (!result) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    )
  }

}
