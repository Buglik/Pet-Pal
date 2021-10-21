import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {getUser} from "../state/user/user.action";
import {Store} from "@ngrx/store";
import {UserState} from "../state/user/user.state";

@Injectable({
  providedIn: 'root'
})
export class UserInitResolver implements Resolve<boolean> {
  constructor(private readonly store: Store<UserState>) {
  }

  resolve(): Observable<boolean> {
    this.store.dispatch(getUser());
    return of(true);
  }
}
