import {Injectable} from '@angular/core';
import {ProfileRequest, ProfileService} from "../../../api/src";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {getUser} from "../../state/user/user.action";
import {NotificationService} from "../../utils/notification/notification.service";

@Injectable()
export class ProfileManagementService {

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  private picPendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  picPending$: Observable<boolean> = this.picPendingSub.asObservable();

  private errorSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error$: Observable<any> = this.errorSub.asObservable();

  constructor(private readonly profileController: ProfileService,
              private readonly notificationService: NotificationService,
              private readonly store: Store<AppState>) {
  }

  updateProfile(data: ProfileRequest) {
    this.pendingSub.next(true);
    this.errorSub.next(null);
    this.profileController.profilemeUpdate(data).pipe(
      map(_ => {
        this.notificationService.success('Profile has been updated successfully');
        this.store.dispatch(getUser());
        this.pendingSub.next(false);
      }),
      catchError(error => {
        this.errorSub.next(error.error);
        this.notificationService.error('Profile update failed');
        this.pendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }

  updateProfilePic(pic: Blob) {
    this.picPendingSub.next(true);
    this.errorSub.next(null);
    this.profileController.profileUpdateAvatarUpdate(pic).pipe(
      map(_ => {
        this.notificationService.success('Profile picture has been updated successfully');
        this.store.dispatch(getUser());
        this.picPendingSub.next(false);
      }),
      catchError(error => {
        this.errorSub.next(error.error);
        this.notificationService.error('Profile picture update failed');
        this.picPendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }

}
