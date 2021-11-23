import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../../api/src";

@Component({
  selector: 'app-sitter-list-item',
  templateUrl: './sitter-list-item.component.html',
  styleUrls: ['./sitter-list-item.component.scss']
})
export class SitterListItemComponent {

  @Input() sitter: PetSitterResponse;

}
