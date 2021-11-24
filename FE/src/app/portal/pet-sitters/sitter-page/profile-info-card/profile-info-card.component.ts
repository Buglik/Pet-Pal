import {Component, Input} from '@angular/core';
import {PetSitterResponse, ReviewPageResponse} from "../../../../../api/src";
import {NavigationService} from "../../../../navigation.service";

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.scss']
})
export class ProfileInfoCardComponent {

  @Input() sitter: PetSitterResponse;
  @Input() isLoggedIn: boolean;
  @Input() reviews: ReviewPageResponse;
  @Input() reviewsPending: boolean;

  constructor(private navigationService: NavigationService) {
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage();
  }

}
