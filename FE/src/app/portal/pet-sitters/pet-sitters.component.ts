import {Component} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {
  changePaginationParamsSitterList,
  setDefaultParamsSitterList,
  TablePaginationParams
} from "../../state/sitters/sitters.actions";
import {Observable} from "rxjs";
import {selectSitters, selectSittersListPaginationParams} from "../../state/sitters/sitters.selectors";
import {PetSitterResponse} from "../../../api/src";
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'app-pet-sitters',
  templateUrl: './pet-sitters.component.html',
  styleUrls: ['./pet-sitters.component.scss']
})
export class PetSittersComponent {

  sitters$: Observable<PetSitterResponse[]>;
  paginationParams$: Observable<TablePaginationParams>;

  constructor(private store: Store<AppState>,
              private readonly navigationService: NavigationService) {
    // TODO: move initializer to resolver
    this.store.dispatch(setDefaultParamsSitterList());
    this.paginationParams$ = store.select(selectSittersListPaginationParams);
    this.sitters$ = store.select(selectSitters);
  }

  changePagination(params: TablePaginationParams) {
    this.store.dispatch(changePaginationParamsSitterList(params));
  }

  navigateToBecomeSitter() {
    this.navigationService.toBecomeSitter();
  }

}
