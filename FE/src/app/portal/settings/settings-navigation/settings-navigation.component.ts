import {Component} from '@angular/core';
import {Link} from "../../../../interfaces/link";

@Component({
  selector: 'app-my-profile-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss']
})
export class SettingsNavigationComponent {
  links: Link[] = [
    {
      label: 'Profile',
      value: 'profile'
    },
    {
      label: 'Change password',
      value: 'changePassword',
      disabled: true
    },
    {
      label: 'Pet sitter',
      value: 'petSitterOptions',
      disabled: true
    },
    {
      label: 'PetOwner',
      value: 'petOwnerOptions',
      disabled: true
    },
  ]

}
