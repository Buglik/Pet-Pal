import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../../api/src";

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.scss']
})
export class ProfileInfoCardComponent {

  @Input() sitter: PetSitterResponse;


}
