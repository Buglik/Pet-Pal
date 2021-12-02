import {Injectable} from '@angular/core';
import {MeResponse, ProfileService} from "../../../api/src";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {NotificationService} from "../../utils/notification/notification.service";
import {NavigationService} from "../../navigation.service";

@Injectable({
  providedIn: 'root'
})
export class ProfilesDisplayManagementService {

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  private profileSub: BehaviorSubject<MeResponse> = new BehaviorSubject<any>(null);
  profile$: Observable<any> = this.profileSub.asObservable();

  constructor(
    private readonly profileService: ProfileService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<AppState>,
    private readonly navigationService: NavigationService) {
  }

  getProfileByUsername(username: string) {
    this.pendingSub.next(true);
    this.profileService.profileGetByUsernameRetrieve(username).pipe(
      map(prof => {
        this.pendingSub.next(false);
        this.profileSub.next(prof)
        return prof
      }),
      catchError(_ => {
        this.notificationService.error('notification.profile.get_by_username.fail');
        this.pendingSub.next(false);
        this.navigationService.back();
        return of();
      }),
      take(1)
    ).subscribe();
  }
}
