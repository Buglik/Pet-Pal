import {Component, OnDestroy} from '@angular/core';
import {logoutUser} from "../../state/user/user.action";
import {Store} from "@ngrx/store";
import {selectUser} from "../../state/user/user.selectors";
import {Subscription} from "rxjs";
import {AppState} from "../../state/app.state";
import {MeResponse} from "../../../api/src";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  private subSink = new Subscription();
  user?: MeResponse;

  constructor(private store: Store<AppState>) {
    this.subSink.add(this.store.select(selectUser).subscribe(next => {
      this.user = next
    }))
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}
