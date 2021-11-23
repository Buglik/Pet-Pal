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
      label: 'form.my_profile.title',
      value: 'profile'
    },
    {
      label: 'form.change_password.title',
      value: 'changePassword',
      disabled: true
    },
    {
      label: 'form.pet_sitter.title',
      value: 'pet-sitting',
    },
    {
      label: 'form.pet_owner.title',
      value: 'petOwnerOptions',
      disabled: true
    },
  ]

}
