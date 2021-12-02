import {Component, Input} from '@angular/core';
import {MeResponse} from "../../../../../api/src";
import {NavigationService} from "../../../../navigation.service";

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.scss']
})
export class ProfileInfoCardComponent {

  @Input() profile: MeResponse;
  @Input() isLoggedIn: boolean;

  constructor(private navigationService: NavigationService) {
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage();
  }

  navigateToSitterPage() {
    this.navigationService.toSitterPage(this.profile.user.username)
  }

}
