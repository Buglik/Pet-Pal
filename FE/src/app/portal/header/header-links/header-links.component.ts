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
      label: 'Find a pet sitter',
      value: '/pet-sitters'
    },
    {
      label: 'Find a pet to sit',
      value: 'findOther'
    },
  ]

}
