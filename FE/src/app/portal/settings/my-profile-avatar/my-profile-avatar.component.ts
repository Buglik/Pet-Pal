import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MeResponse} from "../../../../api/src";

@Component({
  selector: 'app-my-profile-avatar',
  templateUrl: './my-profile-avatar.component.html',
  styleUrls: ['./my-profile-avatar.component.scss']
})
export class MyProfileAvatarComponent {

  @Input() profile: MeResponse | null = null;
  @Input() pending: boolean = false;
  @Output() profilePic: EventEmitter<Blob> = new EventEmitter<Blob>();

  error: string | null = null;

  handleFileInput(event: Event) {
    // @ts-ignore
    let fileItem = event.target.files[0];
    console.log(fileItem)
    // TODO: imporove validation
    let fileNameArr = fileItem.name.split('.');
    if (fileNameArr[1] == 'jpg' || fileNameArr[1] == 'JPG' || fileNameArr[1] == 'png' || fileNameArr[1] == 'PNG') {
      this.profilePic.emit(fileItem);
      this.error = null;
    } else {
      this.error = 'wrong format'
    }
  }
}
