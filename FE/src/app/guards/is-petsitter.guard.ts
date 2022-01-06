import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectUser} from "../state/user/user.selectors";
import {map} from "rxjs/operators";
import {NavigationService} from "../navigation.service";
import {NotificationService} from "../utils/notification/notification.service";

@Injectable()
export class IsPetsitterGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private readonly navigateService: NavigationService,
              private readonly notificationService: NotificationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(user => {
        if (user) {
          if (user.is_pet_sitter) {
            return true;
          } else {
            this.navigateService.toSitterList();
            this.notificationService.error('notification.sitter.create.fail');
            return false;
          }
        } else {
          return false;
        }
      })
    )
  }
}
