import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-avatar',
  templateUrl: './header-avatar.component.html',
  styleUrls: ['./header-avatar.component.scss']
})
export class HeaderAvatarComponent {

  @Input() imgSrc?: string;
  //TODO: implement user avatar
  @Input() initials?: string;

}
