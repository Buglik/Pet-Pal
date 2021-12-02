import {Component, Input} from '@angular/core';
import {MeResponse} from "../../../../../api/src";

@Component({
  selector: 'app-profile-list-item',
  templateUrl: './profile-list-item.component.html',
  styleUrls: ['./profile-list-item.component.scss']
})
export class ProfileListItemComponent {

  @Input() profile: MeResponse;

}
