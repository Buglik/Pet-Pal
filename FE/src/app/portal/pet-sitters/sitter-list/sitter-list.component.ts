import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../api/src";
import {NavigationService} from "../../../navigation.service";

@Component({
  selector: 'app-sitter-list',
  templateUrl: './sitter-list.component.html',
  styleUrls: ['./sitter-list.component.scss']
})
export class SitterListComponent {

  @Input() sitters: PetSitterResponse[];

  constructor(private navigationService: NavigationService) {
  }

  navigateToSitterPage(sitter: PetSitterResponse){
    this.navigationService.toSitterPage(sitter.profile.user.username)
  }

}
