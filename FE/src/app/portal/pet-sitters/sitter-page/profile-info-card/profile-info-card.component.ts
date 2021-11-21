import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../../api/src";
import {NavigationService} from "../../../../navigation.service";

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.scss']
})
export class ProfileInfoCardComponent {

  @Input() sitter: PetSitterResponse;
  @Input() isLoggedIn: boolean;

  constructor(private navigationService: NavigationService) {
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage();
  }

}
