import {Component, Input} from '@angular/core';
import {MeResponse} from "../../../../api/src";

@Component({
  selector: 'app-my-profile-avatar',
  templateUrl: './my-profile-avatar.component.html',
  styleUrls: ['./my-profile-avatar.component.scss']
})
export class MyProfileAvatarComponent {

  @Input() profile?: MeResponse;

}
