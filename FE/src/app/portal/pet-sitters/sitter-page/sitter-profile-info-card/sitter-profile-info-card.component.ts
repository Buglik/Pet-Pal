import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../../api/src";
import {NavigationService} from "../../../../navigation.service";

@Component({
  selector: 'app-sitter-profile-info-card',
  templateUrl: './sitter-profile-info-card.component.html',
  styleUrls: ['./sitter-profile-info-card.component.scss']
})
export class SitterProfileInfoCardComponent {

  @Input() sitter: PetSitterResponse;
  @Input() isLoggedIn: boolean;

  constructor(private navigationService: NavigationService) {
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage();
  }

}
