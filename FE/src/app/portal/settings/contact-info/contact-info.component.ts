import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {MeResponse, ProfileRequest} from "../../../../api/src";
import {selectUser} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {ProfileManagementService} from "../profile-management.service";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {

  pending$: Observable<boolean> = this.profileManagementService.pending$;
  error$: Observable<any> = this.profileManagementService.error$

  user$: Observable<MeResponse | null> = this.store.select(selectUser);

  constructor(private store: Store<AppState>,
              private readonly profileManagementService: ProfileManagementService) {
  }

  updateProfile(data: ProfileRequest){
    this.profileManagementService.updateProfile(data);
  }

}
