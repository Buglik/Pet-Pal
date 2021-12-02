import {Component} from '@angular/core';
import {Link} from "../../../../interfaces/link";

@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.scss']
})
export class HeaderLinksComponent {

  links: Link[] = [
    {
      label: 'menu_link.pet_sitter',
      value: '/pet-sitters'
    },
    {
      label: 'menu_link.pet_owner',
      value: 'findOther'
    },
    {
      label: 'menu_link.profiles',
      value: 'profiles'
    },
  ]

}
