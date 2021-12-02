import {Component, Input} from '@angular/core';
import {MeResponse} from "../../../../api/src";
import {NavigationService} from "../../../navigation.service";

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent {

  @Input() profiles: MeResponse[];

  constructor(private navigationService: NavigationService) {
  }

  navigateToProfilePage(profile: MeResponse) {
    // this.navigationService.toProfilePage(profile.user.username)
  }

}
