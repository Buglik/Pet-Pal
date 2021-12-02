import {Component} from '@angular/core';
import {TablePaginationParams} from "../../state/sitters/sitters.actions";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {changePaginationParamsProfileList, setDefaultParamsProfileList} from "../../state/profiles/profiles.actions";
import {selectProfiles, selectProfilesListPaginationParams} from "../../state/profiles/profiles.selectors";
import {MeResponse} from "../../../api/src";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {

  profiles$: Observable<MeResponse[]>;
  paginationParams$: Observable<TablePaginationParams>;

  constructor(private store: Store<AppState>) {
    // TODO: move initializer to resolver
    this.store.dispatch(setDefaultParamsProfileList());
    this.paginationParams$ = store.select(selectProfilesListPaginationParams);
    this.profiles$ = store.select(selectProfiles);
  }

  changePagination(params: TablePaginationParams) {
    this.store.dispatch(changePaginationParamsProfileList(params));
  }

}
