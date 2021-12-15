import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {MeResponse} from "../../../../api/src";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {selectUser} from "../../../state/user/user.selectors";

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnDestroy {
  private subSink = new Subscription();
  profile: MeResponse | null = null;

  constructor(private store: Store<AppState>) {
    this.subSink.add(this.store.select(selectUser).subscribe(next => {
      this.profile = next
    }))
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
