import {Component} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {setDefaultParamsSitterList} from "../../state/sitters/sitters.actions";

@Component({
  selector: 'app-pet-sitters',
  templateUrl: './pet-sitters.component.html',
  styleUrls: ['./pet-sitters.component.scss']
})
export class PetSittersComponent {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(setDefaultParamsSitterList());
  }

}
