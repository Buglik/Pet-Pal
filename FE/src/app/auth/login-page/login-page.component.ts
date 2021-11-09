import {Component} from '@angular/core';
import {loginUser} from "../../state/user/user.action";
import {selectLoginErrors, selectUserPending} from "../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {LoginRequest} from "../../../api/src";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginInProgress$: Observable<boolean> = this.store.select(selectUserPending);
  error$: Observable<boolean> = this.store.select(selectLoginErrors);

  constructor(private readonly store: Store<AppState>) {
  }

  loginUser(data: LoginRequest) {
    this.store.dispatch(loginUser(data))
  }
}
