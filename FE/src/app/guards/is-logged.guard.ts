import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectUser} from "../state/user/user.selectors";
import {catchError, map, mergeMap} from "rxjs/operators";
import {getUserSuccess} from "../state/user/user.action";
import {ProfileService} from "../../api/src";
import {NavigationService} from "../navigation.service";
import {NotificationService} from "../utils/notification/notification.service";

@Injectable()
export class IsLoggedGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private readonly navigateService: NavigationService,
              private readonly notificationService: NotificationService,
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
        return user ? of(true) : this.tryGetMe();
      }),
      map(result => {
        if (!result) {
          this.navigateService.toMainPage();
          this.notificationService.error('notification.access.not_logged_in');
          return false;
        } else {
          return true;
        }
      })
    )
  }

}
