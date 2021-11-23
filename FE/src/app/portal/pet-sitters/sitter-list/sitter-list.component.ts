import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../api/src";

@Component({
  selector: 'app-sitter-list',
  templateUrl: './sitter-list.component.html',
  styleUrls: ['./sitter-list.component.scss']
})
export class SitterListComponent {

  @Input() sitters: PetSitterResponse[];

}
