import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sitter-section',
  templateUrl: './sitter-section.component.html',
  styleUrls: ['./sitter-section.component.scss']
})
export class SitterSectionComponent {
  @Input() title: string;

}
