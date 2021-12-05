import {Component, Input} from '@angular/core';
import {UserResponse} from "../../../../api/src";
import {NavigationService} from "../../../navigation.service";

@Component({
  selector: 'app-my-profile-page-header',
  templateUrl: './settings-page-header.component.html',
  styleUrls: ['./settings-page-header.component.scss']
})
export class SettingsPageHeaderComponent {

  @Input() user?: UserResponse

  constructor(private readonly navigationService: NavigationService) {
  }
  navigateToSelfProfile(){
    this.navigationService.toProfilePage(this.user?.username)
  }

}
