import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {MeResponse, ProfileRequest} from "../../../../api/src";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {selectUser} from "../../../state/user/user.selectors";
import {ProfileManagementService} from "../profile-management.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnDestroy {

  private subSink = new Subscription();

  avatarPending$: Observable<boolean> = this.profileManagementService.picPending$;
  pending$: Observable<boolean> = this.profileManagementService.pending$;
  error$: Observable<any> = this.profileManagementService.error$

  user$: Observable<MeResponse | null> = this.store.select(selectUser);

  constructor(private store: Store<AppState>,
              private readonly profileManagementService: ProfileManagementService) {
  }

  updateProfilePicture(pic: Blob) {
    this.profileManagementService.updateProfilePic(pic);
  }

  updateProfile(data: ProfileRequest){
    this.profileManagementService.updateProfile(data);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
