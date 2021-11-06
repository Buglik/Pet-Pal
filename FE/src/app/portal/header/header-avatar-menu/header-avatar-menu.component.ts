import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserResponse} from "../../../../api/src";

@Component({
  selector: 'app-header-avatar-menu',
  templateUrl: './header-avatar-menu.component.html',
  styleUrls: ['./header-avatar-menu.component.scss']
})
export class HeaderAvatarMenuComponent {

  @Input() user?: UserResponse;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();


  logoutClick() {
    this.logout.emit();
  }
}
