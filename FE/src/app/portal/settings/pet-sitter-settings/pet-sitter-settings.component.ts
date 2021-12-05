import {Component} from '@angular/core';
import {NavigationService} from "../../../navigation.service";

@Component({
  selector: 'app-pet-sitter-settings',
  templateUrl: './pet-sitter-settings.component.html',
  styleUrls: ['./pet-sitter-settings.component.scss']
})
export class PetSitterSettingsComponent {

  constructor(private navigationService: NavigationService) {
  }

  navigateToBecomeSitter() {
    this.navigationService.toBecomeSitter();
  }
}
