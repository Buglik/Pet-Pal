import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {MeResponse} from "../../../../api/src";
import {selectUser} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";

@Component({
  selector: 'app-pet-sitter-settings',
  templateUrl: './pet-sitter-settings.component.html',
  styleUrls: ['./pet-sitter-settings.component.scss']
})
export class PetSitterSettingsComponent {

  user$: Observable<MeResponse | null> = this.store.select(selectUser);

  constructor(private store: Store<AppState>) {
  }

}
