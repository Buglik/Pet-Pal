import {Component} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {
  changePaginationParamsSitterList,
  setDefaultParamsSitterList,
  TablePaginationParams
} from "../../state/sitters/sitters.actions";
import {Observable} from "rxjs";
import {selectSittersListPaginationParams} from "../../state/sitters/sitters.selectors";

@Component({
  selector: 'app-pet-sitters',
  templateUrl: './pet-sitters.component.html',
  styleUrls: ['./pet-sitters.component.scss']
})
export class PetSittersComponent {

  paginationParams$: Observable<TablePaginationParams>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(setDefaultParamsSitterList());
    this.paginationParams$ = store.select(selectSittersListPaginationParams);

  }

  changePagination(params: TablePaginationParams) {
    this.store.dispatch(changePaginationParamsSitterList(params));
  }

}
