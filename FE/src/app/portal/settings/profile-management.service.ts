import {Injectable} from '@angular/core';
import {ProfileRequest, ProfileService} from "../../../api/src";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {getUser} from "../../state/user/user.action";

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  constructor(private readonly profileController: ProfileService,
              private readonly store: Store<AppState>) {
  }

  updateProfile(data: ProfileRequest) {
    this.pendingSub.next(true);
    this.profileController.profilemeUpdate(data).pipe(
      map(_ => {
        console.log('UPDATE SUCCESS');
        this.store.dispatch(getUser());
        this.pendingSub.next(false);
      }),
      catchError(error => {
        console.log(error.error)
        this.pendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }

}
