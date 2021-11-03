import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {MeResponse} from "../../../../api/src";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {selectUser} from "../../../state/user/user.selectors";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnDestroy {

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

}
