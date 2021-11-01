import {Component, Input} from '@angular/core';
import {UserResponse} from "../../../../api/src";

@Component({
  selector: 'app-my-profile-page-header',
  templateUrl: './settings-page-header.component.html',
  styleUrls: ['./settings-page-header.component.scss']
})
export class SettingsPageHeaderComponent {

  @Input() user?: UserResponse

}
